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
    'react/react-in-jsx-scope': 'off',
    'react/set-state-in-effect': 'off',
    'react/refs': 'off',
    'react/incompatible-library': 'off',
    'react/static-components': 'off',
    'react-hooks/exhaustive-deps': 'warn',
  },
  ignorePatterns: ['node_modules', 'dist', 'coverage'],
};

export default config;
