/** @type {import('oxlint').OxlintConfig} */
const config = {
  plugins: ['typescript', 'unicorn', 'oxc'],
  env: {
    builtin: true,
  },
  categories: {
    correctness: 'error',
    suspicious: 'warn',
    perf: 'warn',
  },
  rules: {},
  ignorePatterns: ['node_modules', 'dist'],
};

export default config;
