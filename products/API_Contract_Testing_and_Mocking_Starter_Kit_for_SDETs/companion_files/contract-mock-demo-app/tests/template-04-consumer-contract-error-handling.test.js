/**
 * Template 04 — Consumer Contract: Error Handling (404 / 422)
 * What: Tests error responses — 404 for unknown user, 422 for validation failure.
 * Why: Error contracts catch breaking changes in error format/status — where most suites are weakest.
 * Where: companion_files/pact-templates/template-04-consumer-contract-error-handling.test.js
 *
 * How to run: npx jest template-04-consumer-contract-error-handling.test.js --runInBand
 * Expected: PASS (2 tests) + pact file now has 5+ interactions
 * What if: 404 vs 200 → willRespondWith status must match provider's actual error status
 * What's next: Template 05 — provider verification (template-05)
 */

const path = require('path');
const { PactV3, MatchersV3 } = require('@pact-foundation/pact');
const axios = require('axios');

const { like, integer, string, eachLike } = MatchersV3;

const provider = new PactV3({
  consumer: 'WebApp',
  provider: 'UserAPI',
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'warn',
});

describe('Consumer Contract — Error Handling (404 / 422)', () => {
  it('returns 404 when user does not exist', async () => {
    provider
      .given('no user with id 999 exists')
      .uponReceiving('a request for non-existent user 999')
      .withRequest({
        method: 'GET',
        path: '/users/999',
        headers: { Accept: 'application/json' },
      })
      .willRespondWith({
        status: 404,
        headers: { 'Content-Type': 'application/json' },
        body: {
          error: like('User not found'),
          message: like('No user with id 999'),
          statusCode: integer(404),
        },
      });

    await provider.executeTest(async (mockServer) => {
      const res = await axios.get(`${mockServer.url}/users/999`, {
        headers: { Accept: 'application/json' },
        validateStatus: () => true,
      });

      expect(res.status).toBe(404);
      expect(res.data.error).toBeDefined();
      expect(res.data.error.toLowerCase()).toContain('not found');
      expect(res.data.statusCode).toBe(404);
    });
  });

  it('returns 422 when creating user with invalid body', async () => {
    provider
      .given('user creation validation is enforced')
      .uponReceiving('a request to create user with invalid email')
      .withRequest({
        method: 'POST',
        path: '/users',
        headers: { 'Content-Type': 'application/json' },
        body: {
          name: like(''),
          email: like('not-an-email'),
        },
      })
      .willRespondWith({
        status: 422,
        headers: { 'Content-Type': 'application/json' },
        body: {
          errors: eachLike(
            {
              field: string('email'),
              message: string('email is required and must be a valid email address'),
            },
            1
          ),
          message: like('Validation failed'),
          statusCode: integer(422),
        },
      });

    await provider.executeTest(async (mockServer) => {
      const res = await axios.post(
        `${mockServer.url}/users`,
        { name: '', email: 'not-an-email' },
        { headers: { 'Content-Type': 'application/json' }, validateStatus: () => true }
      );

      expect(res.status).toBe(422);
      expect(res.data.errors).toBeInstanceOf(Array);
      expect(res.data.errors.length).toBeGreaterThanOrEqual(1);
      expect(res.data.errors[0].field).toBeDefined();
      expect(res.data.statusCode).toBe(422);
    });
  });

  it('returns 422 when creating user with missing name', async () => {
    provider
      .given('user creation requires name')
      .uponReceiving('a request to create user without name')
      .withRequest({
        method: 'POST',
        path: '/users',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email: like('noname@example.com'),
        },
      })
      .willRespondWith({
        status: 422,
        headers: { 'Content-Type': 'application/json' },
        body: {
          errors: eachLike(
            { field: string('name'), message: string('name is required and must be a non-empty string') },
            1
          ),
          message: like('Validation failed'),
          statusCode: integer(422),
        },
      });

    await provider.executeTest(async (mockServer) => {
      const res = await axios.post(
        `${mockServer.url}/users`,
        { email: 'noname@example.com' },
        { headers: { 'Content-Type': 'application/json' }, validateStatus: () => true }
      );
      expect(res.status).toBe(422);
      expect(res.data.errors[0].field).toBe('name');
    });
  });
});
