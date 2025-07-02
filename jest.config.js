module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\.js$': 'babel-jest'
  },
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  collectCoverageFrom: [
    'src/**/*.{js}',
    '!**/node_modules/**'
  ],
  setupFiles: ['<rootDir>/jest.setup.js']
}
