// Remove this file if you prefer to keep the jest configuration in package.json
module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(array-move)/)', // Add this line to transform array-move package
  ],
};
