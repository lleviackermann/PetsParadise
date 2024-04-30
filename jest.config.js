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
export default {
  type: "module",
  // Add other Jest configuration options as needed
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  // Add any other necessary configuration options
};
