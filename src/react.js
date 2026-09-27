/** @type {import('oxlint').OxlintConfig} */
const config = {
  plugins: ['typescript', 'react'],
  env: {
    browser: true,
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
    'react/rules-of-hooks': 'warn',
    'react/only-export-components': ['warn', { allowConstantExport: true }],
    'react/react-in-jsx-scope': 'off',
    'react/set-state-in-effect': 'off',
    'react/refs': 'off',
    'react/incompatible-library': 'off',
    'react/static-components': 'off',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      // TanStack Router file routes export `Route` next to local components; its Vite plugin handles HMR.
      files: ['src/routes/**'],
      rules: {
        'react/only-export-components': 'off',
      },
    },
  ],
  ignorePatterns: ['node_modules', 'dist', 'coverage'],
};

export default config;
