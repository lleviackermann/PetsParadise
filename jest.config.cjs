// export default {
//   // other configurations...
//   testEnvironment: "node",
//   transform: {
//     "^.+\\.jsx?$": "babel-jest",
//   },
//   moduleNameMapper: {
//     "^@testing-library/react$": "@testing-library/react/esm",
//   },
// };

module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testPathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns: ["/node_modules/"],
};
