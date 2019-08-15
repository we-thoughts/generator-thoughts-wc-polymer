module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  // 继承的规则 [扩展]
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/standard"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  // 解析器
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "standard"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: "./",
    extraFileExtensions: []
  },
  rules: {
    "prettier/prettier": 2,
    "@typescript-eslint/explicit-function-return-type": 1,
    "@typescript-eslint/no-var-requires": 1
  }
};
