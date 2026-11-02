/** @type {import("oxlint").OxlintConfig} */
const config = {
  rules: {
    // Express-oriented: Fastify awaits handlers and routes rejections to its error handler.
    "oxc/no-async-endpoint-handlers": "off",
  },
};

export default config;
