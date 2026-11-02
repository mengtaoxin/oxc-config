import nodejs from "./node.js";
import react from "./react.js";
import fastify from "./fastify.js";

/**
 * Parallel stack entries. Conflict resolution uses `weight` (higher wins), not call order.
 * `environment` entries own plugins/env; at most one may appear in `stack(...)`.
 * `addon` entries only tweak rules/overrides.
 *
 * @type {Record<string, {
 *   weight: number,
 *   kind: "environment" | "addon",
 *   config: import("oxlint").OxlintConfig,
 * }>}
 */
export const registry = {
  nodejs: { weight: 10, kind: "environment", config: nodejs },
  react: { weight: 10, kind: "environment", config: react },
  fastify: { weight: 50, kind: "addon", config: fastify },
};

/** @type {Record<string, string>} */
export const aliases = {
  node: "nodejs",
};

export const stackNames = /** @type {const} */ (["nodejs", "react", "fastify"]);
