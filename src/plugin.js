/**
 * Small Oxlint JS plugin for rules this package wants that are not native yet.
 * Plugin name → rule ids: `oxc-config/<rule>`.
 */
const plugin = {
  meta: {
    name: "oxc-config",
  },
  rules: {
    /**
     * Ban TypeScript `enum` (non-const). Prefer `as const` objects or string unions.
     * `const enum` is covered by native `oxc/no-const-enum`.
     */
    "no-enum": {
      meta: {
        type: "suggestion",
        docs: {
          description:
            "Disallow TypeScript enum declarations; prefer `as const` objects or string literal unions.",
        },
        schema: [],
        messages: {
          noEnum:
            "Avoid TypeScript enums; prefer `as const` objects or string literal unions.",
        },
      },
      create(context) {
        return {
          TSEnumDeclaration(node) {
            // `const enum` → oxc/no-const-enum. Ambient `declare enum` is for .d.ts interop.
            if (node.const || node.declare) {
              return;
            }
            context.report({ node, messageId: "noEnum" });
          },
        };
      },
    },
  },
};

export default plugin;
