/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testTimeout: 30000,
  verbose: true,
  testMatch: ['**/exercises/**/*.test.js', '**/exercises/**/*.spec.js'],
};
