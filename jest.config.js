export default {
    testEnvironment: 'node', // Set the test environment to Node.js
    transform: {
        '^.+\\.js$': 'babel-jest', // Use Babel to transpile ES6 modules
      },
    testMatch: ['**/*.test.js'], // Specify the test file pattern
    collectCoverage: true, // Enable code coverage reports
    coverageDirectory: 'coverage', // Specify the directory for coverage reports
  };
  