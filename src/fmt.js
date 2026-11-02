/** @type {import("oxfmt").OxfmtConfig} */
const config = {
  printWidth: 100,
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
  jsxSingleQuote: false,
  sortPackageJson: true,
  ignorePatterns: ["node_modules/", "dist/", "package-lock.json"],
};

export default config;
