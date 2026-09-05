/**
 * wiremock-helpers.js — Reusable WireMock helpers for Practice Lab
 * What: Wraps WireMock Admin API so exercises focus on mappings, not HTTP boilerplate.
 * Why: Copy to your project — one import replaces fetch + error handling.
 * Where: companion_files/contract-mock-practice-lab/helpers/wiremock-helpers.js
 *
 * Usage:
 *   const { createMapping, verifyRequest, resetMappings } = require('../helpers/wiremock-helpers');
 *   beforeAll(async () => { await createMapping({ request: {...}, response: {...} }); });
 */

const WIREMOCK_URL = process.env.WIREMOCK_URL || 'http://localhost:8080';

/**
 * Create a WireMock stub mapping via Admin API.
 * What: POST /__admin/mappings — registers request→response stub.
 * @param {object} mapping - WireMock mapping JSON
 * @returns {Promise<object>} created mapping
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
 * Reset all mappings (clean slate between tests).
 * What: POST /__admin/mappings/reset
 */
async function resetMappings() {
  const res = await fetch(`${WIREMOCK_URL}/__admin/mappings/reset`, { method: 'POST' });
  if (!res.ok) throw new Error(`resetMappings failed: ${res.status}`);
  return res.json();
}

/**
 * Verify a request was made (mock verification).
 * What: POST /__admin/requests/count — counts matching requests.
 * Why: Proves UI/test actually called the API.
 * @param {object} pattern - Request pattern { method, url, headers, etc. }
 * @returns {Promise<number>} count
 */
async function verifyRequest(pattern) {
  const res = await fetch(`${WIREMOCK_URL}/__admin/requests/count`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pattern),
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
 * Reset request journal (clear history, keep mappings).
 */
async function resetRequests() {
  const res = await fetch(`${WIREMOCK_URL}/__admin/requests/reset`, { method: 'POST' });
  if (!res.ok) throw new Error(`resetRequests failed: ${res.status}`);
  return res.json();
}

/**
 * Check if WireMock is running.
 * @returns {Promise<boolean>}
 */
async function isWireMockRunning() {
  try {
    const res = await fetch(`${WIREMOCK_URL}/__admin/mappings`);
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Build a standard WireMock mapping with CORS headers.
 * What: Helper to create mapping JSON with correct CORS + Content-Type.
 * @param {object} opts - { method, url, urlPath, queryParameters, status, jsonBody, headers }
 * @returns {object} WireMock mapping
 */
function buildMapping({ method = 'GET', url, urlPath, queryParameters, status = 200, jsonBody, body, headers = {} }) {
  const request = { method };
  if (url) request.url = url;
  if (urlPath) request.urlPath = urlPath;
  if (queryParameters) request.queryParameters = queryParameters;

  const response = {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
      ...headers,
    },
  };
  if (jsonBody !== undefined) response.jsonBody = jsonBody;
  if (body !== undefined) response.body = body;

  return { request, response };
}

module.exports = {
  WIREMOCK_URL,
  createMapping,
  listMappings,
  resetMappings,
  verifyRequest,
  getRequests,
  resetRequests,
  isWireMockRunning,
  buildMapping,
};
