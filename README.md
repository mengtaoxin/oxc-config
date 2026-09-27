# @mengtaoxin/oxc-config

Shared [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) configs.

## Presets

| Import | Use for |
| --- | --- |
| `@mengtaoxin/oxc-config/react` | React / browser apps (`prate`, `tdbook`, `tdmusic`, …) |
| `@mengtaoxin/oxc-config/node` | Node / CLI packages (`my-infra` scripts, …) |
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
    "@mengtaoxin/oxc-config": "^0.2.0",
    "oxlint": "^1.85.0",
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
