module.exports = {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest', 
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], 
  testEnvironment: 'jsdom', 
  testPathIgnorePatterns: ["e2e-tests/"]
};

