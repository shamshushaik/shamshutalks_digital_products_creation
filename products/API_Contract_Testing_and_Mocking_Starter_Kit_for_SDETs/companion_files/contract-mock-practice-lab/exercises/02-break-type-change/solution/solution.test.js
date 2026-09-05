/**
 * Exercise 02 — Solution: Type Change
 */

const { MatchersV3 } = require('@pact-foundation/pact');
const axios = require('axios');
const { createPact } = require('../../../helpers/pact-helpers');

const { integer, string } = MatchersV3;

describe('Exercise 02 — Solution: Type Change', () => {
  it('consumer expects id as number — integer matcher catches string drift', async () => {
    const provider = createPact('WebApp', 'UserAPI');
    provider
      .given('user with id 1 exists')
      .uponReceiving('a request for user 1 (solution)')
      .withRequest({ method: 'GET', path: '/users/1', headers: { Accept: 'application/json' } })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { id: integer(1), name: string('Alice Johnson') },
      });

    await provider.executeTest(async (mockServer) => {
      const res = await axios.get(`${mockServer.url}/users/1`, { headers: { Accept: 'application/json' }, validateStatus: () => true });
      expect(res.status).toBe(200);
      expect(typeof res.data.id).toBe('number');
      expect(res.data.id).toBe(1);
    });
    // If real provider returns id: "1" (string), Verifier will FAIL:
    // "Expected number but was string" — that's type drift detection.
  });
});
