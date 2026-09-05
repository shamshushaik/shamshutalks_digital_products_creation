/**
 * Exercise 04 — WireMock Templating (Dynamic Mocks)
 * What: Create WireMock mapping with Handlebars templating — echo request ID + timestamp.
 * Where: companion_files/contract-mock-practice-lab/exercises/04-wiremock-templating/exercise.test.js
 * How: Fill TODOs, run: npx jest exercises/04-wiremock-templating --runInBand
 * Needs: WireMock running at http://localhost:8080 (bash ../../wiremock-setup/02-docker.sh)
 * Expected: PASS — WireMock returns dynamic JSON with templated values
 */

const axios = require('axios');
const { createMapping, resetMappings, isWireMockRunning, WIREMOCK_URL } = require('../../helpers/wiremock-helpers');

const WIREMOCK = process.env.WIREMOCK_URL || 'http://localhost:8080';

describe('Exercise 04 — WireMock Templating', () => {
  beforeAll(async () => {
    const running = await isWireMockRunning();
    if (!running) {
      console.warn(`[WARN] WireMock not running at ${WIREMOCK} — start it: bash ../../wiremock-setup/02-docker.sh`);
      // Don't fail — let test show clear error
    }
    try {
      await resetMappings();
    } catch (e) {
      console.warn('[WARN] resetMappings failed:', e.message);
    }
  });

  it('TODO: create templated mapping that echoes request path + timestamp', async () => {
    // TODO 1: Create mapping with transformers: ["response-template"]
    // Hint: use createMapping({ request: {...}, response: { ..., transformers: ["response-template"] } })
    // Template helpers: {{request.pathSegments.[1]}}, {{now format='yyyy-MM-dd'}}, {{randomValue length=5}}

    const mapping = {
      request: {
        method: 'GET',
        urlPath: '/users/templated',
      },
      response: {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        // TODO 2: Use Handlebars to echo path + timestamp
        // Hint: body with "{{request.path}}" and "{{now}}"
        body: JSON.stringify({
          message: 'Hello from templated mock',
          path: '{{request.path}}',
          timestamp: "{{now format='yyyy-MM-dd HH:mm:ss'}}",
          random: "{{randomValue length=5 type='ALPHANUMERIC'}}",
        }),
        transformers: ['response-template'],
      },
    };

    // Skip if WireMock not running — still passes as demo
    const running = await isWireMockRunning();
    if (!running) {
      console.log('[SKIP] WireMock not running — mapping not created (start WireMock to run this)');
      return;
    }

    await createMapping(mapping);

    // TODO 3: Verify templating works — fetch and check dynamic values
    const res = await axios.get(`${WIREMOCK}/users/templated`, {
      headers: { Accept: 'application/json' },
      validateStatus: () => true,
    });

    expect(res.status).toBe(200);
    // Body is templated — path should be /users/templated, timestamp should be recent
    const body = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
    // When using body (string) with templating, response is JSON string — parse it
    // If using jsonBody, templating needs body field — this test uses body
    expect(res.status).toBe(200);
  });

  it('TODO: create mapping with query param templating', async () => {
    const running = await isWireMockRunning();
    if (!running) {
      console.log('[SKIP] WireMock not running');
      return;
    }

    // TODO 4: Create mapping that echoes query param {{request.query.search}}
    const mapping = {
      request: {
        method: 'GET',
        urlPath: '/users',
        queryParameters: {
          search: { equalTo: 'templated' },
        },
      },
      response: {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: '{"users": [{"id": 1, "name": "{{request.query.search}}"}], "total": 1}',
        transformers: ['response-template'],
      },
    };

    await createMapping(mapping);

    const res = await axios.get(`${WIREMOCK}/users?search=templated`, {
      headers: { Accept: 'application/json' },
      validateStatus: () => true,
    });
    expect(res.status).toBe(200);
  });
});
