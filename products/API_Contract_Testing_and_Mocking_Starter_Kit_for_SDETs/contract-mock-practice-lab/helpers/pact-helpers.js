/**
 * pact-helpers.js — Reusable Pact helpers for Practice Lab
 * What: Wraps PactV3 boilerplate so exercises focus on matchers, not setup.
 * Why: Copy this to your project — one import replaces 10 lines of Pact setup.
 * Where: companion_files/contract-mock-practice-lab/helpers/pact-helpers.js
 *
 * Usage:
 *   const { createPact, withAuthHeader } = require('../helpers/pact-helpers');
 *   const provider = createPact('WebApp', 'UserAPI');
 */

const path = require('path');
const { PactV3 } = require('@pact-foundation/pact');

/**
 * Create a PactV3 instance with sensible defaults.
 * What: One-liner to create Pact — sets consumer, provider, dir, logLevel.
 * Why: Avoid repeating dir/logLevel in every test file.
 * @param {string} consumer - Consumer name (e.g., 'WebApp')
 * @param {string} provider - Provider name (e.g., 'UserAPI')
 * @param {object} opts - Optional overrides: dir, logLevel, port
 * @returns {PactV3}
 */
function createPact(consumer = 'WebApp', provider = 'UserAPI', opts = {}) {
  return new PactV3({
    consumer,
    provider,
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'warn',
    ...opts,
  });
}

/**
 * Add Authorization header to a request (for auth-protected APIs).
 * What: Returns header object with Bearer token.
 * Why: Many real APIs need auth — this is the pattern.
 * @param {string} token - Bearer token
 * @returns {object} headers
 */
function withAuthHeader(token = 'test-token-123') {
  return { Authorization: `Bearer ${token}` };
}

/**
 * Common provider states — reusable given() values.
 * What: Predefined provider state strings that match demo-app seed data.
 * Why: Avoid typos in given() — use these constants.
 */
const ProviderStates = {
  USER_1_EXISTS: 'user with id 1 exists',
  USER_2_EXISTS: 'user with id 2 exists',
  NO_USER_999: 'no user with id 999 exists',
  USERS_MATCHING_ALICE: 'users matching alice exist',
  NO_USERS_XYZ: 'no users matching xyznotfound exist',
  VALIDATION_ENFORCED: 'user creation validation is enforced',
};

/**
 * Build a standard JSON header set.
 * @param {object} extra - Extra headers to merge
 * @returns {object}
 */
function jsonHeaders(extra = {}) {
  return { 'Content-Type': 'application/json', Accept: 'application/json', ...extra };
}

module.exports = { createPact, withAuthHeader, ProviderStates, jsonHeaders };
