# @mengtaoxin/oxc-config

Shared [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) configs.

## Stacks

Compose lint config from parallel facts. Call order does not matter; conflict resolution uses weights defined in this package (higher wins).

| Name | Kind | Weight | Effect |
| --- | --- | --- | --- |
| `nodejs` | environment | 10 | Node / CLI base (`./node`). Alias: `node` |
| `react` | environment | 10 | React / browser base (`./react`) |
| `fastify` | addon | 50 | Turns off `oxc/no-async-endpoint-handlers` (Express-oriented) |

Exactly one environment stack is required. Addons are optional and parallel — not subclasses of each other.

| Import | Use for |
| --- | --- |
| `@mengtaoxin/oxc-config` → `stack` | Preferred: `extends: stack("nodejs", "fastify")` |
| `@mengtaoxin/oxc-config/react` | Legacy single preset (same as `stack("react")`) |
| `@mengtaoxin/oxc-config/node` | Legacy single preset (same as `stack("nodejs")`) |
| `@mengtaoxin/oxc-config/fastify` | Fastify addon only (prefer via `stack`) |
| `@mengtaoxin/oxc-config/fmt` | Shared formatter options |

## Install

Published on [GitHub Packages](https://github.com/mengtaoxin/oxc-config/pkgs/npm/oxc-config). Add to `.npmrc`:

```
@mengtaoxin:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Then:

```json
{
  "devDependencies": {
    "@mengtaoxin/oxc-config": "^0.8.0",
    "oxlint": "^1.85.0",
    "oxlint-tsgolint": "^7.0.2001",
    "oxfmt": "^0.70.0"
  }
}
```

Local sibling repo (optional while iterating):

```json
{
  "devDependencies": {
    "@mengtaoxin/oxc-config": "file:../oxc-config"
  }
}
```

## Usage

`oxlint.config.ts`:

```ts
import { defineConfig } from "oxlint";
import { stack } from "@mengtaoxin/oxc-config";

export default defineConfig({
  // Same result as stack("fastify", "nodejs") — order does not matter.
  extends: stack("nodejs", "fastify"),
  // Required: otherwise Oxlint unions default plugins back onto the preset.
  plugins: [],
  ignorePatterns: ["tmp", "db/migrations"], // project-only
});
```

React app without addons:

```ts
import { defineConfig } from "oxlint";
import { stack } from "@mengtaoxin/oxc-config";

export default defineConfig({
  extends: stack("react"),
  plugins: [],
  ignorePatterns: ["src/routeTree.gen.ts"],
});
```

`oxfmt.config.ts`:

```ts
import { defineConfig } from "oxfmt";
import fmt from "@mengtaoxin/oxc-config/fmt";

export default defineConfig({
  ...fmt,
  ignorePatterns: [...(fmt.ignorePatterns ?? []), "src/routeTree.gen.ts"],
});
```

> `.oxlintrc.json` cannot `extends` npm packages — use `oxlint.config.ts` / `oxfmt.config.ts`.

## Lint presets

`nodejs` / `./node` and `react` / `./react` follow `eslint:recommended` and `@typescript-eslint/recommended`, and add the promise/async rules from `recommended-type-checked`. `react` also keeps the React hooks rules and TanStack Router override from earlier releases.

`options.typeAware` is set on both environment stacks and is merged into the root config when you `extends` them. Type-aware lint needs:

- `oxlint-tsgolint` `>=7.0.2001`, declared as a peer dependency. npm installs it with this package. Both presets need it at runtime, plus a `tsconfig.json` that includes the files Oxlint checks.

Warnings from `suspicious`, `perf`, and the suggestion rules below still do not fail the process. To fail on them too, set `options: { denyWarnings: true }` in the root config (it merges with `typeAware`).

### Type-aware rules

`typeAware` turns on every type-aware rule whose category is enabled. Only the `typescript` plugin has type-aware rules (`unicorn`, `oxc`, `import`, and `react` add none). Both presets set `correctness` to error and `suspicious` to warn, so they run the rules below. `perf` has no type-aware rules. `pedantic`, `style`, `restriction`, and `nursery` stay off.

The table matches `oxlint --rules` and a resolved `oxlint --print-config` for oxlint 1.85.0 through 1.89.0. A newer oxlint can add rules to `correctness` or `suspicious`; those run at the category severity.

| Rule | Severity | Why |
| --- | --- | --- |
| `typescript/await-thenable` | error | Set in the preset, and `correctness` |
| `typescript/no-floating-promises` | error | Set in the preset, and `correctness` |
| `typescript/no-misused-promises` | error | Set in the preset. Oxlint files it under `pedantic`, which this preset leaves off |
| `typescript/require-await` | error | Set in the preset. Oxlint files it under `pedantic`, which this preset leaves off |
| `typescript/no-array-delete` | error | `correctness` |
| `typescript/no-base-to-string` | error | `correctness` |
| `typescript/no-duplicate-type-constituents` | error | `correctness` |
| `typescript/no-for-in-array` | error | `correctness` |
| `typescript/no-implied-eval` | error | `correctness` |
| `typescript/no-meaningless-void-operator` | error | `correctness` |
| `typescript/no-misused-spread` | error | `correctness` |
| `typescript/no-redundant-type-constituents` | error | `correctness` |
| `typescript/no-unsafe-unary-minus` | error | `correctness` |
| `typescript/no-useless-default-assignment` | error | `correctness` |
| `typescript/require-array-sort-compare` | error | `correctness` |
| `typescript/restrict-template-expressions` | error | `correctness` |
| `typescript/unbound-method` | error | `correctness` |
| `typescript/consistent-return` | warn | `suspicious` |
| `typescript/no-unnecessary-boolean-literal-compare` | warn | `suspicious` |
| `typescript/no-unnecessary-template-expression` | warn | `suspicious` |
| `typescript/no-unnecessary-type-arguments` | warn | `suspicious` |
| `typescript/no-unnecessary-type-assertion` | warn | `suspicious` |
| `typescript/no-unnecessary-type-conversion` | warn | `suspicious` |
| `typescript/no-unnecessary-type-parameters` | warn | `suspicious` |
| `typescript/no-unsafe-enum-comparison` | warn | `suspicious` |
| `typescript/no-unsafe-type-assertion` | warn | `suspicious` |
| `typescript/no-generated-empty-object-type` | warn | `suspicious` from oxlint 1.86.0. oxlint 1.85.x does not ship this rule |

### 0.5.0

Raised to `error` on `./node` only, matching the recommended configs:

- `no-empty`, `no-prototype-builtins`, `no-regex-spaces`
- `typescript/no-explicit-any`, `typescript/ban-ts-comment`, `typescript/no-empty-object-type`, `typescript/no-unsafe-function-type`, `typescript/no-namespace`, `typescript/no-require-imports`
- `typescript/no-floating-promises`, `typescript/no-misused-promises`, `typescript/await-thenable`, `typescript/require-await`

Left as they were:

| Rule or category | Severity | Why |
| --- | --- | --- |
| `prefer-const`, `prefer-rest-params`, `prefer-spread`, `no-array-constructor` | warn | Suggestions, not `eslint:recommended` |
| `suspicious`, `perf` | warn | Same as before |
| `pedantic`, `style`, `restriction` | off | Outside the recommended configs. Oxlint describes `pedantic` as strict and prone to false positives |
| `typescript/return-await`, `typescript/strict-boolean-expressions` | off | Oxlint category `pedantic` |
| `typescript/no-unnecessary-condition` | off | Oxlint category `nursery` |

### 0.5.1

- `oxlint-tsgolint` `>=7.0.2001` is a required peer, so npm installs it with this package.
- The type-aware rules `./node` actually runs are listed above.

### 0.6.0

Brought `./react` up to the same recommended + type-aware bar as `./node` in 0.5.0:

- Raised to `error`: `no-empty`, `no-prototype-builtins`, `no-regex-spaces`, and the `@typescript-eslint/recommended` rules that were still warnings
- Enabled `options.typeAware` and the promise/async rules (`no-floating-promises`, `no-misused-promises`, `await-thenable`, `require-await`) as `error`
- Left React-specific knobs alone: `react-hooks/exhaustive-deps` stays `warn`; the intentional `react/*` offs and TanStack Router override stay as they were
- Suggestion rules (`prefer-const`, …) and `pedantic` / `style` / `restriction` / `nursery` stay off or warn

### 0.7.0

- `./fmt`: `singleQuote` is now `false` (double quotes), matching oxfmt/Prettier defaults. Expect a repo-wide quote reformat when upgrading.

### 0.8.0

- Added `stack(...names)` from `@mengtaoxin/oxc-config`. Stacks are parallel facts with package-defined weights; argument order does not change the result.
- Added `fastify` addon (disables `oxc/no-async-endpoint-handlers`).
- `./node`, `./react`, and `./fmt` remain available for existing imports.
