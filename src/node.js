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
  rules: {
    'no-empty': 'warn',
    'no-fallthrough': 'warn',
    'no-case-declarations': 'warn',
    'no-prototype-builtins': 'warn',
    'no-regex-spaces': 'warn',
    'no-var': 'warn',
    'prefer-const': 'warn',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'no-array-constructor': 'warn',
    'typescript/no-explicit-any': 'warn',
    'typescript/ban-ts-comment': 'warn',
    'typescript/no-empty-object-type': 'warn',
    'typescript/no-unsafe-function-type': 'warn',
    'typescript/no-namespace': 'warn',
    'typescript/no-require-imports': 'warn',
  },
  ignorePatterns: ['node_modules', 'dist'],
};

export default config;
