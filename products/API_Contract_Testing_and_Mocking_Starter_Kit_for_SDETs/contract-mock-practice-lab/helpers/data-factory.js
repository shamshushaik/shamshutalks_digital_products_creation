/**
 * data-factory.js — Test data factory for Practice Lab
 * What: Generates unique, timestamped test data so tests never collide.
 * Why: Copy to your project — makeUser() gives fresh data every run, no hardcoded IDs.
 * Where: companion_files/contract-mock-practice-lab/helpers/data-factory.js
 *
 * Usage:
 *   const { makeUser, makeUserList, makeErrorResponse } = require('../helpers/data-factory');
 *   const user = makeUser({ name: 'Test User' }); // unique email + timestamp
 */

let seq = 0;

/**
 * Make a single user object with unique timestamped data.
 * What: Returns { id, name, email, active, createdAt, tags } with unique values.
 * Why: Unique data prevents test pollution (no two tests use same email).
 * @param {object} overrides - Fields to override (e.g., { name: 'Alice' })
 * @returns {object}
 */
function makeUser(overrides = {}) {
  seq += 1;
  const ts = Date.now();
  const n = seq;
  return {
    id: 1000 + n,
    name: `Test User ${n}`,
    email: `testuser${n}_${ts}@example.com`,
    active: true,
    createdAt: new Date().toISOString(),
    tags: ['qa'],
    ...overrides,
  };
}

/**
 * Make a list of users.
 * @param {number} count - How many users
 * @param {object} overrides - Overrides applied to each (or function per index)
 * @returns {object[]}
 */
function makeUserList(count = 3, overrides = {}) {
  return Array.from({ length: count }, (_, i) => {
    const extra = typeof overrides === 'function' ? overrides(i) : overrides;
    return makeUser(extra);
  });
}

/**
 * Make an error response body.
 * @param {number} statusCode - 404 or 422
 * @param {string} message - Error message
 * @returns {object}
 */
function makeErrorResponse(statusCode = 404, message = 'User not found') {
  if (statusCode === 404) {
    return { error: message, message, statusCode };
  }
  if (statusCode === 422) {
    return {
      errors: [{ field: 'email', message: 'email is required and must be a valid email address' }],
      message: 'Validation failed',
      statusCode: 422,
    };
  }
  return { error: message, statusCode };
}

/**
 * Make a paginated search response.
 * @param {object[]} users - User array
 * @param {number} page - Current page
 * @param {number} pageSize - Page size
 * @returns {object}
 */
function makeSearchResponse(users = null, page = 1, pageSize = 10) {
  const list = users || makeUserList(2);
  return { users: list, total: list.length, page, pageSize };
}

/**
 * Make a WireMock mapping JSON for a user endpoint.
 * @param {object} user - User object
 * @returns {object} WireMock mapping
 */
function makeUserMapping(user = null) {
  const u = user || makeUser();
  return {
    request: { method: 'GET', url: `/users/${u.id}` },
    response: {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      jsonBody: u,
    },
  };
}

module.exports = { makeUser, makeUserList, makeErrorResponse, makeSearchResponse, makeUserMapping };
