module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/@testing-library/jest-native/extend-expect"],
  transform: {
    "^.+\\.(js|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/mocks/fileMock.js",
  },
};