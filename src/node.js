/** @type {import('oxlint').OxlintConfig} */
const config = {
  plugins: ['typescript', 'unicorn', 'oxc', 'import'],
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
    'no-fallthrough': 'error',
    'no-case-declarations': 'error',
    'no-prototype-builtins': 'warn',
    'no-regex-spaces': 'warn',
    'no-var': 'error',
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
    // Auto-fixable; keeps `import type` separate (unlike `no-duplicate-imports`).
    'import/no-duplicates': 'error',
    // Side-effect imports (CSS, polyfills, locales) are intentional.
    'import/no-unassigned-import': 'off',
  },
  ignorePatterns: ['node_modules', 'dist'],
};

export default config;
