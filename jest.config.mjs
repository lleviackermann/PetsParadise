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
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
