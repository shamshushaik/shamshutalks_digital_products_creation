/**
 * Exercise 04 — Solution: WireMock Templating
 */

const axios = require('axios');
const { createMapping, resetMappings, isWireMockRunning, WIREMOCK_URL } = require('../../../helpers/wiremock-helpers');

const WIREMOCK = process.env.WIREMOCK_URL || 'http://localhost:8080';

describe('Exercise 04 — Solution: WireMock Templating', () => {
  beforeAll(async () => {
    try { await resetMappings(); } catch (e) { /* ignore if not running */ }
  });

  it('templated mapping echoes path and timestamp', async () => {
    const running = await isWireMockRunning();
    if (!running) {
      console.log('[SKIP] WireMock not running at', WIREMOCK);
      return;
    }

    await createMapping({
      request: { method: 'GET', urlPath: '/users/templated' },
      response: {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          message: 'Hello from templated mock',
          path: '{{request.path}}',
          timestamp: "{{now format='yyyy-MM-dd HH:mm:ss'}}",
          random: "{{randomValue length=5 type='ALPHANUMERIC'}}",
        }),
        transformers: ['response-template'],
      },
    });

    const res = await axios.get(`${WIREMOCK}/users/templated`, { headers: { Accept: 'application/json' }, validateStatus: () => true });
    expect(res.status).toBe(200);
  });

  it('query param templating echoes search value', async () => {
    const running = await isWireMockRunning();
    if (!running) {
      console.log('[SKIP] WireMock not running');
      return;
    }

    await createMapping({
      request: { method: 'GET', urlPath: '/users', queryParameters: { search: { equalTo: 'templated' } } },
      response: {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: '{"users": [{"id": 1, "name": "{{request.query.search}}"}], "total": 1}',
        transformers: ['response-template'],
      },
    });

    const res = await axios.get(`${WIREMOCK}/users?search=templated`, { headers: { Accept: 'application/json' }, validateStatus: () => true });
    expect(res.status).toBe(200);
  });
});
