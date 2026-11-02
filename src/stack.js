import { aliases, registry } from "./registry.js";

/**
 * Compose Oxlint configs from parallel stack names.
 * Call order does not matter; higher `weight` in the registry wins on conflicts.
 *
 * @param {...string} names
 * @returns {import("oxlint").OxlintConfig[]}
 */
export function stack(...names) {
  if (names.length === 0) {
    throw new Error('stack() requires at least one name (e.g. stack("nodejs")).');
  }

  /** @type {string[]} */
  const resolved = [];
  const seen = new Set();

  for (const raw of names) {
    if (typeof raw !== "string" || raw.length === 0) {
      throw new Error(`stack() names must be non-empty strings; got ${JSON.stringify(raw)}.`);
    }
    const name = aliases[raw] ?? raw;
    if (!(name in registry)) {
      const known = Object.keys(registry).sort().join(", ");
      throw new Error(`Unknown stack "${raw}". Known stacks: ${known}.`);
    }
    if (!seen.has(name)) {
      seen.add(name);
      resolved.push(name);
    }
  }

  const environments = resolved.filter((name) => registry[name].kind === "environment");
  if (environments.length !== 1) {
    throw new Error(
      `stack() requires exactly one environment stack (nodejs | react); got ${
        environments.length === 0 ? "none" : environments.join(", ")
      }.`,
    );
  }

  const byWeight = [...resolved].sort((a, b) => {
    const diff = registry[a].weight - registry[b].weight;
    if (diff !== 0) return diff;
    // Stable, order-independent tie-break so the same set always merges the same way.
    return a < b ? -1 : a > b ? 1 : 0;
  });

  return byWeight.map((name) => registry[name].config);
}
