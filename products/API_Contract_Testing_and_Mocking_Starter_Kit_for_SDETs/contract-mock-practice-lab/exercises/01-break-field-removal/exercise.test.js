/**
 * Exercise 01 — Break: Field Removal
 * What: Pact contract expects `email` — simulate provider removing it and see FAIL.
 * Where: companion_files/contract-mock-practice-lab/exercises/01-break-field-removal/exercise.test.js
 * How: Fill TODOs, run: npx jest exercises/01-break-field-removal --runInBand
 * Expected: PASS before break, FAIL after uncommenting BREAKING section
 */

const path = require('path');
const { PactV3, MatchersV3 } = require('@pact-foundation/pact');
const axios = require('axios');
const { createPact } = require('../../helpers/pact-helpers');
const { makeUser } = require('../../helpers/data-factory');

const { string, integer, regex } = MatchersV3;

describe('Exercise 01 — Field Removal (🔴 Breaking)', () => {
  it('TODO: consumer expects email — provider must return it', async () => {
    // TODO 1: Create Pact instance — use helper or new PactV3
    // Hint: const provider = createPact('WebApp', 'UserAPI');
    const provider = createPact('WebApp', 'UserAPI');

    // TODO 2: Define interaction — GET /users/1 should return email
    // Hint: provider.given(...).uponReceiving(...).withRequest(...).willRespondWith(...)
    provider
      .given('user with id 1 exists')
      .uponReceiving('a request for user 1 (exercise 01)')
      .withRequest({
        method: 'GET',
        path: '/users/1',
        headers: { Accept: 'application/json' },
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          id: integer(1),
          // TODO 3: Add email matcher — what matcher catches field removal?
          // Hint: string('alice@example.com') or regex for format
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
      // TODO 4: Assert email exists — what should you check?
      expect(res.data.email).toBeDefined();
      expect(res.data.email).toMatch(/^[^@]+@[^@]+\.[^@]+$/);
    });
  });

  // ── BREAKING CHANGE SIMULATION ──────────────────────────────────────
  // Uncomment this test to simulate provider REMOVING email field.
  // This SHOULD fail — Pact will show diff: expected email but was missing.
  // Fix: keep email in provider (even if null) or version API.
  /*
  it('BREAKING: provider removes email — verification should FAIL', async () => {
    const provider = createPact('WebApp', 'UserAPI');
    provider
      .given('user with id 1 exists')
      .uponReceiving('a request for user 1 without email')
      .withRequest({ method: 'GET', path: '/users/1', headers: { Accept: 'application/json' } })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          id: integer(1),
          name: string('Alice Johnson'),
          // email is MISSING — this is the breaking change!
        },
      });
    await provider.executeTest(async (mockServer) => {
      const res = await axios.get(`${mockServer.url}/users/1`, { headers: { Accept: 'application/json' }, validateStatus: () => true });
      expect(res.status).toBe(200);
      // This will FAIL if provider actually omits email — Pact diff shows missing field
      expect(res.data.email).toBeDefined();
    });
  });
  */
});
