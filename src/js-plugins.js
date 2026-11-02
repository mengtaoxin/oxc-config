import { fileURLToPath } from "node:url";

/**
 * Absolute paths are required when configs are consumed via `extends` objects
 * (relative `./` specifiers are rejected by Oxlint).
 *
 * @type {NonNullable<import("oxlint").OxlintConfig["jsPlugins"]>}
 */
export const jsPlugins = [fileURLToPath(new URL("./plugin.js", import.meta.url))];

/** Rules that depend on {@link jsPlugins} plus related native enum rules. */
export const enumRules = {
  // Native; autofix; category `restriction` (off by default in this package).
  "oxc/no-const-enum": "error",
  // Custom; bans non-const `enum` in favor of `as const` / unions.
  "oxc-config/no-enum": "error",
};
