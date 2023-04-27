/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  automock: false,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js)$": "babel-jest",
  },
  transformIgnorePatterns: [],
  setupFiles: ["jest-canvas-mock"],
  setupFilesAfterEnv: ["./setup-test.ts"],
  testEnvironmentOptions: {
    resources: "usable",
    url: "https://placehold.co/600x400",
  },
};
