/**
 * Template 03 — Consumer Contract: GET /users?search=&page= (Search with Query Params)
 * What: Tests GET /users?search=alice&page=1 — verifies query param handling + array matchers.
 * Why: Most real APIs have search/pagination — teaches query matching + eachLike for lists.
 * Where: companion_files/pact-templates/template-03-consumer-contract-search.test.js
 *
 * How to run: npx jest template-03-consumer-contract-search.test.js --runInBand
 * Expected: PASS + pact file now has 3+ interactions
 * What if: Query param order → Pact matches regardless of order
 * What's next: Template 04 — error cases 404/422 (template-04)
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

describe('Consumer Contract — GET /users?search=&page= (Search)', () => {
  it('searches users by name and returns paginated results', async () => {
    provider
      .given('users matching alice exist')
      .uponReceiving('a search request for alice on page 1')
      .withRequest({
        method: 'GET',
        path: '/users',
        query: { search: 'alice', page: '1' },
        headers: { Accept: 'application/json' },
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          users: eachLike(
            {
              id: integer(1),
              name: string('Alice Johnson'),
              email: string('alice@example.com'),
              active: like(true),
              tags: eachLike('admin', 1),
            },
            1
          ),
          total: integer(1),
          page: integer(1),
          pageSize: integer(10),
        },
      });

    await provider.executeTest(async (mockServer) => {
      const res = await axios.get(`${mockServer.url}/users`, {
        params: { search: 'alice', page: '1' },
        headers: { Accept: 'application/json' },
        validateStatus: () => true,
      });

      expect(res.status).toBe(200);
      expect(res.data.users).toBeInstanceOf(Array);
      expect(res.data.users.length).toBeGreaterThanOrEqual(1);
      expect(res.data.total).toBeDefined();
      expect(res.data.page).toBe(1);
      expect(res.data.users[0].name.toLowerCase()).toContain('alice');
    });
  });

  it('returns empty list when no users match search', async () => {
    provider
      .given('no users matching xyznotfound exist')
      .uponReceiving('a search request with no matches')
      .withRequest({
        method: 'GET',
        path: '/users',
        query: { search: 'xyznotfound', page: '1' },
        headers: { Accept: 'application/json' },
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          users: [],
          total: integer(0),
          page: integer(1),
          pageSize: integer(10),
        },
      });

    await provider.executeTest(async (mockServer) => {
      const res = await axios.get(`${mockServer.url}/users`, {
        params: { search: 'xyznotfound', page: '1' },
        headers: { Accept: 'application/json' },
        validateStatus: () => true,
      });
      expect(res.status).toBe(200);
      expect(res.data.users).toEqual([]);
      expect(res.data.total).toBe(0);
    });
  });

  it('supports pagination — page 2', async () => {
    provider
      .given('users exist for pagination')
      .uponReceiving('a request for page 2 with pageSize 2')
      .withRequest({
        method: 'GET',
        path: '/users',
        query: { page: '2', pageSize: '2' },
        headers: { Accept: 'application/json' },
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          users: eachLike(
            { id: integer(3), name: string('Charlie Brown'), email: string('charlie@example.com') },
            1
          ),
          total: integer(5),
          page: integer(2),
          pageSize: integer(2),
        },
      });

    await provider.executeTest(async (mockServer) => {
      const res = await axios.get(`${mockServer.url}/users`, {
        params: { page: '2', pageSize: '2' },
        headers: { Accept: 'application/json' },
        validateStatus: () => true,
      });
      expect(res.status).toBe(200);
      expect(res.data.page).toBe(2);
      expect(res.data.pageSize).toBe(2);
    });
  });
});
