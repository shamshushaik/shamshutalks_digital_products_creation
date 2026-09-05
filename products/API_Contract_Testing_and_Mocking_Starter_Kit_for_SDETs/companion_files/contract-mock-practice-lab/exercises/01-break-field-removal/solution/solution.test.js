/**
 * Exercise 01 — Solution: Field Removal
 * What: Complete answer — consumer expects email, provider must return it.
 * Why: Shows correct matcher (string/regex) that catches field removal.
 */

const { PactV3, MatchersV3 } = require('@pact-foundation/pact');
const axios = require('axios');
const { createPact } = require('../../../helpers/pact-helpers');

const { string, integer, regex } = MatchersV3;

describe('Exercise 01 — Solution: Field Removal', () => {
  it('consumer expects email — provider must return it', async () => {
    const provider = createPact('WebApp', 'UserAPI');
    provider
      .given('user with id 1 exists')
      .uponReceiving('a request for user 1 (solution)')
      .withRequest({ method: 'GET', path: '/users/1', headers: { Accept: 'application/json' } })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          id: integer(1),
          name: string('Alice Johnson'),
          email: regex('^[^@]+@[^@]+\\.[^@]+$', 'alice@example.com'),
        },
      });

    await provider.executeTest(async (mockServer) => {
      const res = await axios.get(`${mockServer.url}/users/1`, {
        headers: { Accept: 'application/json' },
        validateStatus: () => true,
      });
      expect(res.status).toBe(200);
      expect(res.data.email).toBeDefined();
      expect(res.data.email).toMatch(/^[^@]+@[^@]+\.[^@]+$/);
    });
  });

  it('BREAKING demo: if provider omits email, consumer test still defines it — Verifier will FAIL', async () => {
    // This test PASSES as consumer test (it defines what consumer wants).
    // The FAIL happens at Verifier time when real provider omits email.
    // To see it: run Verifier against provider that omits email → diff shows missing field.
    const provider = createPact('WebApp', 'UserAPI');
    provider
      .given('user with id 1 exists')
      .uponReceiving('a request for user 1 — expects email')
      .withRequest({ method: 'GET', path: '/users/1', headers: { Accept: 'application/json' } })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { id: integer(1), name: string('Alice'), email: string('alice@example.com') },
      });

    await provider.executeTest(async (mockServer) => {
      const res = await axios.get(`${mockServer.url}/users/1`, { headers: { Accept: 'application/json' }, validateStatus: () => true });
      expect(res.status).toBe(200);
      expect(res.data.email).toBe('alice@example.com');
    });
    // Now if real provider at http://localhost:3000 omits email, Verifier (template-05) will FAIL:
    // "Expected email but was missing" — that's the breaking-change detection.
  });
});
