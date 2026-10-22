# @mengtaoxin/oxc-config

Shared [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) configs.

## Presets

| Import | Use for |
| --- | --- |
| `@mengtaoxin/oxc-config/react` | React / browser apps (`prate`, `tdbook`, `tdmusic`, …) |
| `@mengtaoxin/oxc-config/node` | Node / CLI packages. Recommended, plus the promise/async type-aware rules |
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
    "@mengtaoxin/oxc-config": "^0.5.0",
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
import { defineConfig } from 'oxlint';
import react from '@mengtaoxin/oxc-config/react';

export default defineConfig({
  extends: [react],
  // Required: otherwise Oxlint unions default plugins back onto the preset.
  plugins: [],
  ignorePatterns: ['src/routeTree.gen.ts'], // project-only
});
```

`oxfmt.config.ts`:

```ts
import { defineConfig } from 'oxfmt';
import fmt from '@mengtaoxin/oxc-config/fmt';

export default defineConfig({
  ...fmt,
  ignorePatterns: [...(fmt.ignorePatterns ?? []), 'src/routeTree.gen.ts'],
});
```

> `.oxlintrc.json` cannot `extends` npm packages — use `oxlint.config.ts` / `oxfmt.config.ts`.

## Node preset

`./node` follows `eslint:recommended` and `@typescript-eslint/recommended`, and adds the promise/async rules from `recommended-type-checked`. `./react` is unchanged.

```ts
import { defineConfig } from 'oxlint';
import node from '@mengtaoxin/oxc-config/node';

export default defineConfig({
  extends: [node],
  plugins: [],
});
```

`options.typeAware` is set on the preset and is merged into the root config when you `extends` it. Type-aware lint needs:

- `oxlint-tsgolint` installed (optional peer; required for `./node`)
- a `tsconfig.json` that includes the files Oxlint checks

Warnings from `suspicious`, `perf`, and the suggestion rules below still do not fail the process. To fail on them too, set `options: { denyWarnings: true }` in the root config (it merges with `typeAware`).

### 0.5.0

Raised to `error`, matching the recommended configs:

- `no-empty`, `no-prototype-builtins`, `no-regex-spaces`
- `typescript/no-explicit-any`, `typescript/ban-ts-comment`, `typescript/no-empty-object-type`, `typescript/no-unsafe-function-type`, `typescript/no-namespace`, `typescript/no-require-imports`
- `typescript/no-floating-promises`, `typescript/no-misused-promises`, `typescript/await-thenable`, `typescript/require-await`

Left as they were:

| Rule or category | Severity | Why |
| --- | --- | --- |
| `prefer-const`, `prefer-rest-params`, `prefer-spread`, `no-array-constructor` | warn | Suggestions, not `eslint:recommended` |
| `suspicious`, `perf` | warn | Same as before |
| `pedantic`, `style`, `restriction` | off | Outside the recommended configs. Oxlint describes `pedantic` as strict and prone to false positives |
| `typescript/return-await` | off | Stylistic, not in `recommended-type-checked` |
| `typescript/no-unnecessary-condition`, `typescript/strict-boolean-expressions` | off | `@typescript-eslint` strict, not recommended |
