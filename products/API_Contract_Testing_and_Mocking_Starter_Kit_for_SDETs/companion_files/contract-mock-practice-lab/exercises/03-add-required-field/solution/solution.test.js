/**
 * Exercise 03 — Solution: Add Required Field
 */

const { MatchersV3 } = require('@pact-foundation/pact');
const axios = require('axios');
const { createPact } = require('../../../helpers/pact-helpers');

const { string, integer, regex } = MatchersV3;

describe('Exercise 03 — Solution: Add Required Field', () => {
  it('POST without phone succeeds — old contract', async () => {
    const provider = createPact('WebApp', 'UserAPI');
    provider
      .given('user creation without phone is allowed')
      .uponReceiving('a request to create user without phone (solution)')
      .withRequest({
        method: 'POST',
        path: '/users',
        headers: { 'Content-Type': 'application/json' },
        body: { name: string('Charlie Brown'), email: regex('^[^@]+@[^@]+\\.[^@]+$', 'charlie@example.com') },
      })
      .willRespondWith({
        status: 201,
        headers: { 'Content-Type': 'application/json' },
        body: { id: integer(8), name: string('Charlie Brown'), email: regex('^[^@]+@[^@]+\\.[^@]+$', 'charlie@example.com') },
      });

    await provider.executeTest(async (mockServer) => {
      const res = await axios.post(`${mockServer.url}/users`, { name: 'Charlie Brown', email: 'charlie@example.com' }, { headers: { 'Content-Type': 'application/json' }, validateStatus: () => true });
      expect(res.status).toBe(201);
    });
    // If provider now requires phone, Verifier against real provider would FAIL:
    // Old consumer (no phone) → 422 "phone is required" — breaking change.
    // Fix: make phone optional or version endpoint.
  });
});
