/**
 * Exercise 05 — Solution: UI Against Mock
 */

const axios = require('axios');
const { createMapping, resetMappings, verifyRequest, isWireMockRunning, WIREMOCK_URL } = require('../../../helpers/wiremock-helpers');

const BASE_URL = process.env.WIREMOCK_URL || 'http://localhost:8080';

describe('Exercise 05 — Solution: UI Against Mock', () => {
  beforeAll(async () => {
    const running = await isWireMockRunning();
    if (!running) {
      console.warn(`[WARN] WireMock not running at ${WIREMOCK_URL}`);
      return;
    }
    await resetMappings();
    await createMapping({
      request: { method: 'GET', url: '/users/1' },
      response: {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        jsonBody: { id: 1, name: 'Alice Johnson', email: 'alice@example.com', active: true, tags: ['admin', 'qa'] },
      },
    });
  });

  it('UI fetches user via baseUrl (env var switch)', async () => {
    const running = await isWireMockRunning();
    if (!running) {
      console.log('[SKIP] WireMock not running');
      return;
    }
    const res = await axios.get(`${BASE_URL}/users/1`, { headers: { Accept: 'application/json' }, validateStatus: () => true });
    expect(res.status).toBe(200);
    expect(res.data.name).toBe('Alice Johnson');
  });

  it('verifies WireMock received the request', async () => {
    const running = await isWireMockRunning();
    if (!running) {
      console.log('[SKIP] WireMock not running');
      return;
    }
    await axios.get(`${BASE_URL}/users/1`, { headers: { Accept: 'application/json' }, validateStatus: () => true });
    const count = await verifyRequest({ method: 'GET', url: '/users/1' });
    expect(count).toBeGreaterThanOrEqual(1);
  });

  it('CORS header is present', async () => {
    const running = await isWireMockRunning();
    if (!running) {
      console.log('[SKIP] WireMock not running');
      return;
    }
    const res = await axios.get(`${BASE_URL}/users/1`, { headers: { Accept: 'application/json' }, validateStatus: () => true });
    expect(res.headers['access-control-allow-origin']).toBe('*');
  });
});
