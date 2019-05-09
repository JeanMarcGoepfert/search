module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    node: true,
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["prettier", "mocha"],
  rules: {
    "prettier/prettier": ["error"],
    eqeqeq: ["error", "always"],
    "no-console": 0
  }
};
