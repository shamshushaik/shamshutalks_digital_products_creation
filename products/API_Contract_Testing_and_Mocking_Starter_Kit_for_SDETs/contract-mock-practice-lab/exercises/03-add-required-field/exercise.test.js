/**
 * Exercise 03 — Break: Add Required Field
 * What: POST /users without phone — simulate provider now requiring phone and see FAIL.
 * Where: companion_files/contract-mock-practice-lab/exercises/03-add-required-field/exercise.test.js
 * How: Fill TODOs, run: npx jest exercises/03-add-required-field --runInBand
 */

const { MatchersV3 } = require('@pact-foundation/pact');
const axios = require('axios');
const { createPact } = require('../../helpers/pact-helpers');

const { string, integer, regex } = MatchersV3;

describe('Exercise 03 — Add Required Field (🔴 Breaking)', () => {
  it('TODO: POST without phone should succeed (old contract)', async () => {
    const provider = createPact('WebApp', 'UserAPI');

    // TODO 1: Define POST /users without phone — old consumer doesn't send phone
    provider
      .given('user creation without phone is allowed')
      .uponReceiving('a request to create user without phone (exercise 03)')
      .withRequest({
        method: 'POST',
        path: '/users',
        headers: { 'Content-Type': 'application/json' },
        body: {
          name: string('Charlie Brown'),
          email: regex('^[^@]+@[^@]+\\.[^@]+$', 'charlie@example.com'),
          // No phone — old consumer doesn't know about it
        },
      })
      .willRespondWith({
        status: 201,
        headers: { 'Content-Type': 'application/json' },
        body: {
          id: integer(8),
          name: string('Charlie Brown'),
          email: regex('^[^@]+@[^@]+\\.[^@]+$', 'charlie@example.com'),
        },
      });

    await provider.executeTest(async (mockServer) => {
      const res = await axios.post(
        `${mockServer.url}/users`,
        { name: 'Charlie Brown', email: 'charlie@example.com' },
        { headers: { 'Content-Type': 'application/json' }, validateStatus: () => true }
      );
      expect(res.status).toBe(201);
      expect(res.data.id).toBeDefined();
    });
  });

  // ── BREAKING: Uncomment to simulate provider REQUIRING phone ───────────
  // Old consumer without phone would get 422 — that's breaking!
  // Fix: make phone optional (no validation if missing) or version endpoint.
  /*
  it('BREAKING: provider now requires phone — old consumer FAILS', async () => {
    const provider = createPact('WebApp', 'UserAPI');
    provider
      .given('user creation requires phone')
      .uponReceiving('a request to create user without phone — should fail')
      .withRequest({
        method: 'POST',
        path: '/users',
        headers: { 'Content-Type': 'application/json' },
        body: { name: string('Charlie'), email: string('charlie@example.com') },
      })
      .willRespondWith({
        status: 422,
        headers: { 'Content-Type': 'application/json' },
        body: {
          errors: [{ field: 'phone', message: 'phone is required' }],
          message: 'Validation failed',
          statusCode: 422,
        },
      });
    await provider.executeTest(async (mockServer) => {
      const res = await axios.post(`${mockServer.url}/users`, { name: 'Charlie', email: 'charlie@example.com' }, { headers: { 'Content-Type': 'application/json' }, validateStatus: () => true });
      expect(res.status).toBe(422); // Old consumer expected 201, now gets 422 — breaking!
    });
  });
  */
});
