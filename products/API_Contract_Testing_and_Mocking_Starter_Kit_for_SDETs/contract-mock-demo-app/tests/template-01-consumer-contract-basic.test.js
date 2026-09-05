/**
 * Template 01 — Consumer Contract: GET /users/:id (Basic)
 * What: Tests GET /users/:id — verifies provider returns user with correct types.
 * Why: Simplest contract — teaches PactV3 + like/integer/string/regex/boolean/timestamp/eachLike.
 * Where: companion_files/pact-templates/template-01-consumer-contract-basic.test.js
 *        Copy to your project: contract-mock-demo-app/tests/ or any Jest project.
 *
 * How to run:
 *   npm install --save-dev @pact-foundation/pact jest axios
 *   npx jest template-01-consumer-contract-basic.test.js --runInBand
 *   Expected: PASS + pacts/WebApp-UserAPI.json generated
 *
 * What you should see: "PASS" + pacts/WebApp-UserAPI.json with 1 interaction
 * What if: Pact file not generated → check dir exists (mkdir -p pacts)
 * What's next: Template 02 — POST with body + regex (template-02)
 *
 * Stack: Pact 17.1.3 + MatchersV3 + Jest 29 + Node 18+
 * Verified: 2026-09-04 against docs.pact.io + github.com/pact-foundation/pact-js
 */

const path = require('path');
const { PactV3, MatchersV3 } = require('@pact-foundation/pact');
const axios = require('axios');

const { like, integer, string, regex, boolean, timestamp, eachLike } = MatchersV3;

// ── Pact Setup ──────────────────────────────────────────────────────────
// What: PactV3 creates an ephemeral mock server, records interactions, writes pact JSON.
// Why: Consumer-driven — consumer defines what it expects, provider must satisfy.
// Where: dir = where pact JSON is written (commit this file, share with provider).
const provider = new PactV3({
  consumer: 'WebApp',
  provider: 'UserAPI',
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'warn',
});

describe('Consumer Contract — GET /users/:id (Basic)', () => {
  it('returns user by id with correct shape and types', async () => {
    // given — provider state: tells provider what data to seed before verification
    // Analogy: like telling kitchen "make sure dish #1 is ready before I order"
    provider
      .given('user with id 1 exists')
      .uponReceiving('a request for user 1')
      .withRequest({
        method: 'GET',
        path: '/users/1',
        headers: { Accept: 'application/json' },
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          // Matchers — flexible rules that catch breaking changes:
          id: integer(1), // any number passes — catches type drift (string→number)
          name: string('Alice Johnson'), // any string passes — catches missing field
          email: regex('^[^@]+@[^@]+\\.[^@]+$', 'alice@example.com'), // format check — catches email format drift
          active: boolean(true), // any boolean — catches type drift
          createdAt: timestamp("yyyy-MM-dd'T'HH:mm:ss.SSSX", '2024-01-15T10:30:00.000Z'), // ISO timestamp
          tags: eachLike('admin', 1), // array of at least 1 string — catches array shape drift
        },
      });

    // executeTest — starts mock server, runs your code, verifies, writes pact file
    await provider.executeTest(async (mockServer) => {
      // mockServer.url is the ephemeral Pact mock URL (random port, no conflict)
      const res = await axios.get(`${mockServer.url}/users/1`, {
        headers: { Accept: 'application/json' },
        validateStatus: () => true,
      });

      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toMatch(/application\/json/);
      expect(res.data.id).toBe(1);
      expect(res.data.name).toBeDefined();
      expect(res.data.email).toMatch(/^[^@]+@[^@]+\.[^@]+$/);
      expect(res.data.active).toBeDefined();
      expect(res.data.tags).toBeInstanceOf(Array);
    });
  });

  it('handles like matcher for flexible type checking', async () => {
    // like — most permissive: any value of same type passes
    // Use when you care about TYPE but not exact value
    provider
      .given('user with id 2 exists')
      .uponReceiving('a request for user 2 with like matcher')
      .withRequest({
        method: 'GET',
        path: '/users/2',
        headers: { Accept: 'application/json' },
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          id: like(2),
          name: like('Bob Smith'),
          email: like('bob@example.com'),
        },
      });

    await provider.executeTest(async (mockServer) => {
      const res = await axios.get(`${mockServer.url}/users/2`, {
        headers: { Accept: 'application/json' },
        validateStatus: () => true,
      });
      expect(res.status).toBe(200);
      expect(typeof res.data.id).toBe('number');
      expect(typeof res.data.name).toBe('string');
    });
  });
});
