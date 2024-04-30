export default {
  // other configurations...
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@testing-library/react$": "@testing-library/react/esm",
  },
};
