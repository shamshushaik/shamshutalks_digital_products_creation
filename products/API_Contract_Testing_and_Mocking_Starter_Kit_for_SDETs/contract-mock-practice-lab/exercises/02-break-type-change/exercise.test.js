/**
 * Exercise 02 — Break: Type Change
 * What: Pact expects id as number — simulate provider returning string and see FAIL.
 * Where: companion_files/contract-mock-practice-lab/exercises/02-break-type-change/exercise.test.js
 * How: Fill TODOs, run: npx jest exercises/02-break-type-change --runInBand
 */

const { MatchersV3 } = require('@pact-foundation/pact');
const axios = require('axios');
const { createPact } = require('../../helpers/pact-helpers');

const { integer, string } = MatchersV3;

describe('Exercise 02 — Type Change (🔴 Breaking)', () => {
  it('TODO: consumer expects id as number — use integer matcher', async () => {
    const provider = createPact('WebApp', 'UserAPI');

    // TODO 1: Use integer(1) for id — what happens if provider returns "1" (string)?
    provider
      .given('user with id 1 exists')
      .uponReceiving('a request for user 1 (exercise 02)')
      .withRequest({ method: 'GET', path: '/users/1', headers: { Accept: 'application/json' } })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          // TODO 2: What matcher catches type drift? integer vs string vs like?
          id: integer(1),
          name: string('Alice Johnson'),
        },
      });

    await provider.executeTest(async (mockServer) => {
      const res = await axios.get(`${mockServer.url}/users/1`, {
        headers: { Accept: 'application/json' },
        validateStatus: () => true,
      });
      expect(res.status).toBe(200);
      // TODO 3: Assert id is number — what check proves type?
      expect(typeof res.data.id).toBe('number');
      expect(res.data.id).toBe(1);
    });
  });

  // ── BREAKING: Uncomment to simulate provider returning id as string ─────
  // This SHOULD fail at Verifier time — diff: expected number but was string
  /*
  it('BREAKING: provider returns id as string — should FAIL', async () => {
    const provider = createPact('WebApp', 'UserAPI');
    provider
      .given('user with id 1 exists')
      .uponReceiving('a request for user 1 with string id')
      .withRequest({ method: 'GET', path: '/users/1', headers: { Accept: 'application/json' } })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { id: string('1'), name: string('Alice') }, // string "1" not number 1
      });
    await provider.executeTest(async (mockServer) => {
      const res = await axios.get(`${mockServer.url}/users/1`, { headers: { Accept: 'application/json' }, validateStatus: () => true });
      expect(typeof res.data.id).toBe('string'); // would pass here, but Verifier against real provider (number) would FAIL
    });
  });
  */
});
