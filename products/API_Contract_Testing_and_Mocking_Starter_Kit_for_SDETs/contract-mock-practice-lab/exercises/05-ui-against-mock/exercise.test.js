/**
 * Exercise 05 — UI Against Mock (Env Var + CORS + Verification)
 * What: Simulate UI fetch against WireMock via baseUrl, then verify request was received.
 * Where: companion_files/contract-mock-practice-lab/exercises/05-ui-against-mock/exercise.test.js
 * How: Fill TODOs, run: npx jest exercises/05-ui-against-mock --runInBand
 * Needs: WireMock running at http://localhost:8080 (bash ../../wiremock-setup/02-docker.sh)
 * Expected: PASS — fetch returns Alice, verifyRequest count is 1
 */

const axios = require('axios');
const { createMapping, resetMappings, verifyRequest, isWireMockRunning, WIREMOCK_URL } = require('../../helpers/wiremock-helpers');

const BASE_URL = process.env.WIREMOCK_URL || process.env.VITE_API_URL || 'http://localhost:8080';
// In real UI: const BASE_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL

describe('Exercise 05 — UI Against Mock', () => {
  beforeAll(async () => {
    const running = await isWireMockRunning();
    if (!running) {
      console.warn(`[WARN] WireMock not running at ${WIREMOCK_URL} — start it: bash ../../wiremock-setup/02-docker.sh`);
      return;
    }
    try {
      await resetMappings();
      // TODO 1: Create mapping for GET /users/1 that UI will hit
      // Hint: use createMapping({ request: { method: 'GET', url: '/users/1' }, response: { status: 200, ... } })
      await createMapping({
        request: { method: 'GET', url: '/users/1' },
        response: {
          status: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          jsonBody: { id: 1, name: 'Alice Johnson', email: 'alice@example.com', active: true, tags: ['admin', 'qa'] },
        },
      });
      console.log('[OK] Mapping created: GET /users/1');
    } catch (e) {
      console.warn('[WARN] setup failed:', e.message);
    }
  });

  it('TODO: UI fetches user via baseUrl (env var switch — no code change)', async () => {
    const running = await isWireMockRunning();
    if (!running) {
      console.log('[SKIP] WireMock not running — skipping fetch test');
      return;
    }

    // TODO 2: Simulate UI fetch — use BASE_URL (env var) + "/users/1"
    // In real UI: fetch(`${import.meta.env.VITE_API_URL}/users/1`)
    // Here: axios.get(`${BASE_URL}/users/1`)
    const res = await axios.get(`${BASE_URL}/users/1`, {
      headers: { Accept: 'application/json' },
      validateStatus: () => true,
    });

    // TODO 3: Assert UI got correct data
    expect(res.status).toBe(200);
    expect(res.data.name).toBe('Alice Johnson');
    expect(res.data.email).toMatch(/^[^@]+@[^@]+\.[^@]+$/);
  });

  it('TODO: verify WireMock received the request (mock verification)', async () => {
    const running = await isWireMockRunning();
    if (!running) {
      console.log('[SKIP] WireMock not running');
      return;
    }

    // First make a request so there's something to verify
    await axios.get(`${BASE_URL}/users/1`, { headers: { Accept: 'application/json' }, validateStatus: () => true });

    // TODO 4: Verify WireMock received GET /users/1
    // Hint: verifyRequest({ method: 'GET', url: '/users/1' }) → count
    const count = await verifyRequest({ method: 'GET', url: '/users/1' });

    expect(count).toBeGreaterThanOrEqual(1);
    console.log(`[OK] WireMock received GET /users/1 ${count} time(s) — UI did call the mock!`);
  });

  it('TODO: check CORS header is present (for browser)', async () => {
    const running = await isWireMockRunning();
    if (!running) {
      console.log('[SKIP] WireMock not running');
      return;
    }

    const res = await axios.get(`${BASE_URL}/users/1`, { headers: { Accept: 'application/json' }, validateStatus: () => true });
    // TODO 5: Assert CORS header — why needed? Browser blocks without it
    expect(res.headers['access-control-allow-origin']).toBe('*');
  });
});
