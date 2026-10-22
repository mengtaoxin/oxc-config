/** @type {import('oxlint').OxlintConfig} */
const config = {
  plugins: ['typescript', 'unicorn', 'oxc', 'import'],
  env: {
    builtin: true,
  },
  // Merged into the root config via `extends`. Requires a tsconfig and `oxlint-tsgolint`.
  options: {
    typeAware: true,
  },
  categories: {
    correctness: 'error',
    suspicious: 'warn',
    perf: 'warn',
  },
  rules: {
    // error in eslint:recommended; Oxlint does not include them in `correctness`.
    'no-empty': 'error',
    'no-fallthrough': 'error',
    'no-case-declarations': 'error',
    'no-prototype-builtins': 'error',
    'no-regex-spaces': 'error',
    'no-var': 'error',
    // Suggestions. Not part of eslint:recommended.
    'prefer-const': 'warn',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'no-array-constructor': 'warn',
    // @typescript-eslint/recommended
    'typescript/no-explicit-any': 'error',
    'typescript/ban-ts-comment': 'error',
    'typescript/no-empty-object-type': 'error',
    'typescript/no-unsafe-function-type': 'error',
    'typescript/no-namespace': 'error',
    'typescript/no-require-imports': 'error',
    // Promise/async rules from @typescript-eslint/recommended-type-checked.
    'typescript/no-floating-promises': 'error',
    'typescript/no-misused-promises': 'error',
    'typescript/await-thenable': 'error',
    'typescript/require-await': 'error',
    // Auto-fixable; keeps `import type` separate (unlike `no-duplicate-imports`).
    'import/no-duplicates': 'error',
    // Side-effect imports (CSS, polyfills, locales) are intentional.
    'import/no-unassigned-import': 'off',
  },
  ignorePatterns: ['node_modules', 'dist'],
};

export default config;
