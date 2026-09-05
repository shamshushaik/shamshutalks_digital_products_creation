/**
 * WireMock Setup — Script 03: Programmatic Mock Server (Node.js)
 * What: Starts and configures WireMock via its Admin API from Node.js — no JAR, no Docker CLI.
 * Why: For SDETs who want to spin mocks from code (e.g., beforeAll in Jest) — fully programmatic.
 * Where: companion_files/wiremock-setup/wiremock-03-start-mock-server.js
 * How: node wiremock-03-start-mock-server.js  (WireMock must already be running at http://localhost:8080)
 *      Or import: const { createMapping, verifyRequest } = require('./wiremock-03-start-mock-server');
 * Expected: "WireMock mappings created" + curl http://localhost:8080/users/1 → 200
 * What if: ECONNREFUSED → start WireMock first (01-standalone-jar.sh or 02-docker.sh)
 *          404 → check WIREMOCK_URL env var
 *
 * Stack: Node 18+ (native fetch), no extra deps. Works with Jest beforeAll/afterAll.
 * Verified: 2026-09-04 against https://wiremock.org/docs/stubbing/ + /verifying/
 */

const WIREMOCK_URL = process.env.WIREMOCK_URL || 'http://localhost:8080';

// ── Helpers ─────────────────────────────────────────────────────────────

/**
 * Create or update a WireMock stub mapping via Admin API.
 * What: POST /__admin/mappings — registers a request→response stub.
 * Why: Lets you define mocks from code instead of JSON files.
 * @param {object} mapping - WireMock mapping JSON (request + response)
 * @returns {Promise<object>} created mapping with id
 */
async function createMapping(mapping) {
  const res = await fetch(`${WIREMOCK_URL}/__admin/mappings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mapping),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`createMapping failed: ${res.status} ${text}`);
  }
  return res.json();
}

/**
 * List all mappings.
 */
async function listMappings() {
  const res = await fetch(`${WIREMOCK_URL}/__admin/mappings`);
  if (!res.ok) throw new Error(`listMappings failed: ${res.status}`);
  return res.json();
}

/**
 * Delete all mappings (reset).
 * What: POST /__admin/mappings/reset — clears all stubs.
 * Why: Clean slate between tests.
 */
async function resetMappings() {
  const res = await fetch(`${WIREMOCK_URL}/__admin/mappings/reset`, { method: 'POST' });
  if (!res.ok) throw new Error(`resetMappings failed: ${res.status}`);
  return res.json();
}

/**
 * Verify that a request was made (mock verification).
 * What: POST /__admin/requests/count — counts matching requests in journal.
 * Why: Proves UI actually called the API (mock verification, not just stubbing).
 * @param {object} requestPattern - WireMock request pattern (method, url, etc.)
 * @returns {Promise<number>} count of matching requests
 */
async function verifyRequest(requestPattern) {
  const res = await fetch(`${WIREMOCK_URL}/__admin/requests/count`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestPattern),
  });
  if (!res.ok) throw new Error(`verifyRequest failed: ${res.status}`);
  const data = await res.json();
  return data.count;
}

/**
 * Get all requests in journal (for debugging).
 */
async function getRequests() {
  const res = await fetch(`${WIREMOCK_URL}/__admin/requests`);
  if (!res.ok) throw new Error(`getRequests failed: ${res.status}`);
  return res.json();
}

/**
 * Health check — is WireMock running?
 */
async function isWireMockRunning() {
  try {
    const res = await fetch(`${WIREMOCK_URL}/__admin/mappings`);
    return res.ok;
  } catch {
    return false;
  }
}

// ── Example: Create 3 mappings programmatically ─────────────────────────

async function setupExampleMappings() {
  console.log(`[WireMock] Connecting to ${WIREMOCK_URL}...`);

  const running = await isWireMockRunning();
  if (!running) {
    console.error(`[ERROR] WireMock not running at ${WIREMOCK_URL}`);
    console.error('Start it first:');
    console.error('  bash 01-standalone-jar.sh  (needs Java 11+)');
    console.error('  bash 02-docker.sh          (needs Docker)');
    console.error('  docker-compose up          (needs Docker)');
    process.exit(1);
  }
  console.log('[OK] WireMock is running');

  // Reset existing mappings
  await resetMappings();
  console.log('[OK] Reset existing mappings');

  // 1. GET /users/1
  await createMapping({
    request: { method: 'GET', url: '/users/1', headers: { Accept: { equalTo: 'application/json' } } },
    response: {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      jsonBody: { id: 1, name: 'Alice Johnson', email: 'alice@example.com', active: true, createdAt: '2024-01-15T10:30:00.000Z', tags: ['admin', 'qa'] },
    },
  });
  console.log('[OK] Created mapping: GET /users/1');

  // 2. POST /users
  await createMapping({
    request: { method: 'POST', url: '/users', headers: { 'Content-Type': { contains: 'application/json' } } },
    response: {
      status: 201,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      jsonBody: { id: 6, name: 'Bob Smith', email: 'bob.new@example.com', active: true, createdAt: '2024-06-01T12:00:00.000Z', tags: ['developer'] },
    },
  });
  console.log('[OK] Created mapping: POST /users');

  // 3. GET /users?search=alice&page=1
  await createMapping({
    request: { method: 'GET', urlPath: '/users', queryParameters: { search: { equalTo: 'alice' }, page: { equalTo: '1' } } },
    response: {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      jsonBody: { users: [{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', active: true, tags: ['admin', 'qa'] }], total: 1, page: 1, pageSize: 10 },
    },
  });
  console.log('[OK] Created mapping: GET /users?search=alice&page=1');

  // 4. GET /health
  await createMapping({
    request: { method: 'GET', url: '/health' },
    response: {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      jsonBody: { status: 'ok', version: '1.0.0', timestamp: new Date().toISOString() },
      transformers: ['response-template'],
    },
  });
  console.log('[OK] Created mapping: GET /health');

  // Verify
  const mappings = await listMappings();
  console.log(`\n[OK] Total mappings: ${mappings.mappings.length}`);
  console.log(`[OK] Try: curl ${WIREMOCK_URL}/users/1`);
  console.log(`[OK] Admin: ${WIREMOCK_URL}/__admin/mappings`);
}

// ── CLI ─────────────────────────────────────────────────────────────────
if (require.main === module) {
  setupExampleMappings().catch((err) => {
    console.error('[ERROR]', err.message);
    process.exit(1);
  });
}

module.exports = { createMapping, listMappings, resetMappings, verifyRequest, getRequests, isWireMockRunning, setupExampleMappings, WIREMOCK_URL };
