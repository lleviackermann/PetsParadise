export default {
  // other configurations...
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@testing-library/react$": "@testing-library/react/esm",
  },
};
