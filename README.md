# newAng (`newang`)

Opinionated dark Angular component library. Pastel lime accent, flat static colors — no gradients, no glows. Near-zero consumer CSS: spacing, type, layout and form rhythm are baked into `na-*` components.

## Install

```bash
ng add newang
```

This wires the theme into `src/styles.scss`:

```scss
@use 'newang/styles' as na;
@include na.base();
```

Manual install:

```bash
npm i newang
```

## Zero-CSS usage

```html
<na-app>
  <na-page maxWidth="md">
    <na-stack gap="lg">
      <na-heading level="1">Sign in</na-heading>
      <na-field label="Email" hint="Work email" error="">
        <input naInput placeholder="you@co.com" />
      </na-field>
      <na-button variant="primary">Login</na-button>
    </na-stack>
  </na-page>
</na-app>
```

No `class=`, no `style=`, no stylesheets. Control everything with inputs: `gap`, `size`, `tone`, `variant`, `maxWidth`, `cols`.

## Components

| Area | Components |
| --- | --- |
| Actions | `na-button` |
| Forms | `na-field`, `na-form`, `input[naInput]`, `na-switch`, `na-checkbox`, `na-radio-group` |
| Layout | `na-app`, `na-page`, `na-stack`, `na-row`, `na-grid`, `na-split`, `na-divider`, `na-spacer` |
| Type | `na-heading`, `na-text`, `na-link`, `na-code`, `na-empty-state` |
| Display | `na-card`, `na-badge`, `na-alert`, `na-table`, `na-list`, `na-breadcrumbs`, `na-avatar`, `na-spinner`, `na-progress` |
| Overlay | `na-modal`, `na-tabs`, `naTooltip` |
| Shell | `na-header`, `na-footer`, `na-toolbar` |

## Theme

Dark-only for v1. Tokens live in `newang/styles` (`$na-bg`, `$na-accent`, …) as `!default` SCSS variables mirrored to `--na-*` CSS custom properties. Flat elevation via 1px borders; focus is a 2px lime `outline`. Stylelint bans `linear-gradient`, `box-shadow` (except `none`), `text-shadow` and `drop-shadow`.

## Releases

Every push to `main` runs CI (stylelint, build, tests) then `semantic-release`: conventional commits → version bump → CHANGELOG → GitHub Release → `npm publish`.

Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `chore:` …

Setup: add an npm Automation token as repo secret `NPM_TOKEN`. Then anyone can run `ng add newang` to get the latest release.

## Develop

```bash
npm ci
npm run build
npm run test
npm run lint:style
```
