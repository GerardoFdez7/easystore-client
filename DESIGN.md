---
version: alpha
name: EasyStore design system
description: The visual language of EasyStore, a multilingual no-code e-commerce platform. One light-and-dark theme pair built on a soft grey canvas, a saturated orchid-purple primary, an emerald secondary, and Inter throughout. Marketing and authentication surfaces use pill-shaped purple actions; the store-management workspace uses restrained Shadcn/Radix primitives with black (light) or white (dark) "title" actions, hairline borders, and minimal shadows. Both tracks share one palette, one font family, and one radius source.

colors:
  background: '#f3f4f6'
  foreground: '#423f3d'
  title: '#000000'
  primary: '#9d3fe0'
  primary-foreground: 'oklch(0.985 0 0)'
  primary-tint: '#ebdbf5'
  dark-primary-tint: '#3c244b'
  secondary: '#0a7d57'
  secondary-foreground: 'oklch(0.205 0 0)'
  warning: '#f59e0b'
  error: '#b91c1c'
  destructive: 'oklch(0.577 0.245 27.325)'
  hover: '#e6e7e9'
  card: 'oklch(1 0 0)'
  card-foreground: 'oklch(0.145 0 0)'
  popover: 'oklch(1 0 0)'
  popover-foreground: 'oklch(0.145 0 0)'
  muted: 'oklch(94.912% 0.00011 271.152)'
  muted-foreground: 'oklch(0.52 0 0)'
  accent: 'oklch(0.97 0 0)'
  accent-foreground: 'oklch(0.205 0 0)'
  border: 'oklch(0.922 0 0)'
  input: 'oklch(0.922 0 0)'
  ring: 'oklch(0.708 0 0)'
  sidebar: 'oklch(0.985 0 0)'
  sidebar-foreground: 'oklch(0.145 0 0)'
  overlay: 'rgb(0 0 0 / 50%)'
  chart-1: 'oklch(0.646 0.222 41.116)'
  chart-2: 'oklch(0.6 0.118 184.704)'
  chart-3: 'oklch(0.398 0.07 227.392)'
  chart-4: 'oklch(0.828 0.189 84.429)'
  chart-5: 'oklch(0.769 0.188 70.08)'
  dark-background: '#121212'
  dark-foreground: '#f3f4f6'
  dark-title: '#ffffff'
  dark-hover: '#303030'
  dark-card: 'oklch(0.145 0 0)'
  dark-card-foreground: 'oklch(0.985 0 0)'
  dark-primary-foreground: 'oklch(0.205 0 0)'
  dark-muted: 'oklch(0.269 0 0)'
  dark-muted-foreground: 'oklch(0.708 0 0)'
  dark-accent: 'oklch(0.269 0 0)'
  dark-destructive: 'oklch(0.704 0.191 22.216)'
  dark-border: 'oklch(1 0 0 / 10%)'
  dark-input: 'oklch(1 0 0 / 15%)'
  dark-ring: 'oklch(0.556 0 0)'
  dark-sidebar: 'oklch(0.205 0 0)'

typography:
  display-logo:
    fontFamily: Inter, sans-serif
    fontSize: 40px
    fontWeight: 800
    lineHeight: 1.0
    letterSpacing: 0
  heading-xl:
    fontFamily: Inter, sans-serif
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  heading-lg:
    fontFamily: Inter, sans-serif
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: 0
  card-title:
    fontFamily: Inter, sans-serif
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: 0
  body-md:
    fontFamily: Inter, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  button-auth:
    fontFamily: Inter, sans-serif
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: 0
  button-social:
    fontFamily: Inter, sans-serif
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: 0
  label-md:
    fontFamily: Inter, sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: 0
  body-sm:
    fontFamily: Inter, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0
  caption:
    fontFamily: Inter, sans-serif
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.33
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 10px
  xl: 14px
  pill: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  control: 0.5rem
  page: 1.25rem
  section: 1.5rem
  card: 1.5rem

components:
  button-title:
    backgroundColor: '{colors.title}'
    textColor: '{colors.primary-foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.md}'
    height: 36px
    padding: 8px 16px
  button-title-hover:
    backgroundColor: '{colors.title}'
    textColor: '{colors.primary-foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.md}'
  button-default:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.primary-foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.md}'
    height: 36px
    padding: 8px 16px
  button-secondary:
    backgroundColor: '{colors.secondary}'
    textColor: '#ffffff'
    typography: '{typography.label-md}'
    rounded: '{rounded.md}'
    height: 36px
    padding: 8px 16px
  button-destructive:
    backgroundColor: '{colors.destructive}'
    textColor: '#ffffff'
    typography: '{typography.label-md}'
    rounded: '{rounded.md}'
    height: 36px
    padding: 8px 16px
  button-danger:
    backgroundColor: '{colors.error}'
    textColor: '#ffffff'
    typography: '{typography.label-md}'
    rounded: '{rounded.md}'
    height: 36px
    padding: 8px 16px
  button-outline:
    backgroundColor: '{colors.background}'
    textColor: '{colors.foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.md}'
    height: 36px
    padding: 8px 16px
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '{colors.foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.md}'
    height: 36px
    padding: 8px 16px
  button-link:
    backgroundColor: 'transparent'
    textColor: '{colors.primary}'
    typography: '{typography.label-md}'
    rounded: '{rounded.md}'
  button-plans:
    backgroundColor: '{colors.primary}'
    textColor: '#ffffff'
    typography: '{typography.label-md}'
    rounded: '{rounded.pill}'
    padding: 8px 16px
  button-auth:
    backgroundColor: '{colors.primary}'
    textColor: '#ffffff'
    typography: '{typography.button-auth}'
    rounded: '{rounded.pill}'
    padding: 12px 16px
  button-social:
    backgroundColor: '{colors.primary-tint}'
    textColor: '{colors.foreground}'
    typography: '{typography.button-social}'
    rounded: '{rounded.pill}'
    padding: 8px 16px
  text-input:
    backgroundColor: 'transparent'
    textColor: '{colors.foreground}'
    typography: '{typography.body-md}'
    rounded: '{rounded.md}'
    height: 36px
    padding: 4px 12px
  text-input-outside:
    backgroundColor: 'transparent'
    textColor: '{colors.foreground}'
    typography: '{typography.body-md}'
    rounded: '{rounded.lg}'
    height: 56px
    padding: 8px 16px
  textarea:
    backgroundColor: 'transparent'
    textColor: '{colors.foreground}'
    typography: '{typography.body-md}'
    rounded: '{rounded.md}'
    padding: 8px 12px
  checkbox:
    backgroundColor: '{colors.title}'
    textColor: '{colors.primary-foreground}'
    rounded: '{rounded.xs}'
    size: 16px
  switch:
    backgroundColor: '{colors.title}'
    textColor: '{colors.background}'
    rounded: '{rounded.pill}'
    height: 18px
    width: 32px
  card:
    backgroundColor: '{colors.card}'
    textColor: '{colors.card-foreground}'
    typography: '{typography.body-md}'
    rounded: '{rounded.xl}'
    padding: 24px
  card-title:
    textColor: '{colors.title}'
    typography: '{typography.card-title}'
  card-description:
    textColor: '{colors.muted-foreground}'
    typography: '{typography.body-sm}'
  badge-default:
    backgroundColor: '{colors.title}'
    textColor: '{colors.primary-foreground}'
    typography: '{typography.caption}'
    rounded: '{rounded.md}'
    padding: 2px 8px
  badge-secondary:
    backgroundColor: '{colors.secondary}'
    textColor: '{colors.secondary-foreground}'
    typography: '{typography.caption}'
    rounded: '{rounded.md}'
    padding: 2px 8px
  badge-destructive:
    backgroundColor: '{colors.destructive}'
    textColor: '#ffffff'
    typography: '{typography.caption}'
    rounded: '{rounded.md}'
    padding: 2px 8px
  badge-outline:
    backgroundColor: 'transparent'
    textColor: '{colors.foreground}'
    typography: '{typography.caption}'
    rounded: '{rounded.md}'
    padding: 2px 8px
  badge-tag:
    backgroundColor: '{colors.background}'
    textColor: '{colors.foreground}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.md}'
    padding: 2px 8px
  tabs-list:
    backgroundColor: '{colors.muted}'
    textColor: '{colors.muted-foreground}'
    rounded: '{rounded.lg}'
    height: 36px
    padding: 3px
  tabs-trigger-active:
    backgroundColor: '{colors.background}'
    textColor: '{colors.foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.md}'
    padding: 4px 8px
  alert:
    backgroundColor: '{colors.background}'
    textColor: '{colors.foreground}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.lg}'
    padding: 12px 16px
  alert-destructive:
    backgroundColor: '{colors.background}'
    textColor: '{colors.destructive}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.lg}'
    padding: 12px 16px
  dialog:
    backgroundColor: '{colors.background}'
    textColor: '{colors.foreground}'
    typography: '{typography.body-md}'
    rounded: '{rounded.lg}'
    padding: 24px
  tooltip:
    backgroundColor: '{colors.title}'
    textColor: '{colors.primary-foreground}'
    typography: '{typography.caption}'
    rounded: '{rounded.md}'
    padding: 6px 12px
  table-row:
    backgroundColor: '{colors.background}'
    textColor: '{colors.foreground}'
    typography: '{typography.body-md}'
  skeleton:
    backgroundColor: '{colors.hover}'
    rounded: '{rounded.md}'
  empty-state-icon:
    backgroundColor: '{colors.hover}'
    textColor: '{colors.muted-foreground}'
    rounded: '{rounded.pill}'
    padding: 24px
  toast-success:
    backgroundColor: '{colors.secondary}'
    textColor: '#ffffff'
    typography: '{typography.body-md}'
    rounded: '{rounded.lg}'
  toast-warning:
    backgroundColor: '{colors.warning}'
    textColor: '#ffffff'
    typography: '{typography.body-md}'
    rounded: '{rounded.lg}'
  toast-error:
    backgroundColor: '{colors.error}'
    textColor: '#ffffff'
    typography: '{typography.body-md}'
    rounded: '{rounded.lg}'
  sidebar:
    backgroundColor: '{colors.sidebar}'
    textColor: '{colors.sidebar-foreground}'
    typography: '{typography.label-md}'
---

## Overview

EasyStore is a no-code builder: its users are shop owners, not developers, so the interface has to feel approachable on the first screen and dependable on the hundredth. The design system runs two tracks on a single palette:

- **Expressive track** (landing, pricing, authentication, onboarding, plan selection). Orchid-purple `{colors.primary}` carries the brand. Buttons here are fully rounded pills (`{rounded.pill}`) with bold type, social sign-in buttons use a pale purple tint (`{colors.primary-tint}`), and the `Logo` wordmark is set in Inter ExtraBold at 40px. The mood is friendly, confident, slightly playful.
- **Workspace track** (dashboard, products, categories, inventory, profile, settings). A quiet soft-grey `{colors.background}` canvas, white `{colors.card}` surfaces with hairline borders, 8px-radius controls, and a high-contrast **title** action (`{colors.title}`: black in light mode, white in dark mode) as the dominant button. Purple appears sparingly here, mostly for links, focus identity, and the brand mark, so catalog data and forms stay in the foreground.

The two tracks never need different tokens. They differ in which Button variant, radius and weight they pick from the same set.

**Key Characteristics:**

- One font family: **Inter** at every weight from 100 to 900, loaded once via `next/font` as `--font-inter`.
- Body text is a fixed `1rem` baseline. Form controls and buttons inherit it (`font-size: inherit`); smaller sizes are an intentional exception, not a default.
- Semantic tokens only. Every colour is a CSS variable (`bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, …) that flips with the `.dark` class. Components do not carry theme-specific hex values.
- A single radius source, `--radius: 0.625rem`. Small, medium, large and extra-large derive from it by ±2–4px.
- Flat by default. Shadows are limited to `shadow-xs` on controls and `shadow-sm` on cards and the active tab. Depth comes from borders and surface contrast.
- A 3px translucent ring (`ring-ring/50`) is the one focus treatment, shared by every interactive primitive.
- Status colours are reserved for status: green = success/secondary, amber = warning, red = error/destructive.
- Multilingual by construction. No component may assume English string length; labels wrap or truncate gracefully (see Responsive Behavior).

## Colors

> **Source:** `app/[locale]/globals.css` (`:root` and `.dark`), exposed to Tailwind through `@theme inline`.

### Brand & Accent

- **Primary / Orchid** (`{colors.primary}` — `#9d3fe0`): the brand colour. Used for the `default`, `plans` and `auth` button fills, link text, the `BadgeTag`-adjacent accents, spinner `primary` variant, and the checkbox checked state in dark mode. Identical in light and dark themes.
- **Primary Tint** (`{colors.primary-tint}` — `#ebdbf5` light, `{colors.dark-primary-tint}` `#3c244b` dark): the soft purple fill of the `social` button (`bg-primary-tint`). It is the only tint of the brand colour in the system, so don't derive others ad hoc. Text on it uses `foreground`, which is why the dark value is a deep purple rather than the light tint.
- **Secondary / Emerald** (`{colors.secondary}` — `#0a7d57`): supporting action and positive status. Used by the `secondary` Button, the `secondary` Badge, success toasts, and the `secondary` spinner. Identical in both themes.

### Status

- **Warning** (`{colors.warning}` — `#f59e0b`): warning toasts and cautionary states. White text on top.
- **Error** (`{colors.error}` — `#dc2626`): error toasts and the `danger` Button, the heavier of the two red actions.
- **Destructive** (`{colors.destructive}`): the Shadcn invalid/destructive role. Used for the `destructive` Button and Badge, `aria-invalid` borders and rings, `Alert` destructive, and inline field errors. It lightens in dark mode (`{colors.dark-destructive}`) to keep contrast.

`error` and `destructive` are two separate roles and both exist on purpose: `error` is the loud, solid, brand-level red for confirmed failures and irreversible buttons; `destructive` is the validation-level red that appears at 20–50% opacity in rings and borders.

### Surface

| Role         | Light                           | Dark                                 | Use                                                           |
| ------------ | ------------------------------- | ------------------------------------ | ------------------------------------------------------------- |
| `background` | `{colors.background}` `#f3f4f6` | `{colors.dark-background}` `#121212` | App canvas, dialog and table backgrounds, outline-button fill |
| `card`       | `{colors.card}` white           | `{colors.dark-card}` near-black      | Cards, popovers                                               |
| `muted`      | `{colors.muted}`                | `{colors.dark-muted}`                | Tab-list track, subdued fills                                 |
| `accent`     | `{colors.accent}`               | `{colors.dark-accent}`               | Outline/ghost hover surface, selected-item highlight          |
| `hover`      | `{colors.hover}` `#e6e7e9`      | `{colors.dark-hover}` `#303030`      | Ghost-button hover, `Skeleton` fill, `EmptyState` icon disc   |
| `sidebar`    | `{colors.sidebar}`              | `{colors.dark-sidebar}`              | Workspace sidebar and its sub-roles                           |
| `overlay`    | `{colors.overlay}`              | same                                 | Dialog / sheet / drawer scrim (`bg-black/50`)                 |

Note that in the workspace the canvas (`background`) is _darker_ than the cards (`card`) in light mode, and _lighter_ than the cards in dark mode. This is intentional: cards always read as the raised layer.

### Text

- **Foreground** (`{colors.foreground}` — `#423f3d` light, `#f3f4f6` dark): default body and label text. A warm dark grey, never pure black.
- **Title** (`{colors.title}` — `#000000` light, `#ffffff` dark): headings, card titles, the wordmark, and the fill of the high-contrast `title` Button, `default` Badge, active `Switch` and `Checkbox`, and tooltip bubbles. Title is both a text colour and an action colour: it is the "ink" of the interface.
- **Muted Foreground** (`{colors.muted-foreground}`, tuned to reach 4.5:1 on the `background` canvas): descriptions, placeholders, helper text, `EmptyState` copy and icons, form-field counters.
- **Primary Foreground** (`{colors.primary-foreground}` light / `{colors.dark-primary-foreground}` dark): text on `title`/`primary` fills. It inverts with the theme so the `title` Button stays legible when its background flips from black to white.
- **White** (`#ffffff`): text on `secondary`, `danger`, `destructive`, `plans`, `auth` and toast fills. It does not change by theme.

### Borders & Focus

- **Border** (`{colors.border}`): applied globally (`* { @apply border-border outline-ring/50 }`), so any `border` utility gets the hairline automatically. 10% white in dark mode.
- **Input** (`{colors.input}`): the control border; 15% white in dark mode, where inputs also take a 40% `input` fill (`dark:bg-input/40`).
- **Ring** (`{colors.ring}`): the focus ring. Always used at 50% opacity and 3px wide.

### Data Visualisation

`{colors.chart-1}` through `{colors.chart-5}` define the chart series (orange, teal, deep blue, yellow, amber in light mode; re-keyed to vivid blue, green, amber, violet, red in dark mode). Use them in order through the `chart.tsx` wrapper; don't hard-code series colours.

## Typography

### Font Family

**Inter** is the only family. It is loaded in the root layout as `--font-inter` with weights 100–900 and mapped to three Tailwind roles: `font-sans`, `font-heading` and `font-regular`. All three resolve to the same face, so choose the role that expresses intent (`font-heading` for titles) without expecting a different typeface. There is no monospace, display or serif tier. If code needs to be shown, use the browser's default `ui-monospace` stack and don't theme it.

Body text is set to `var(--font-size-default)` = `1rem`. `button`, `input`, `optgroup`, `select` and `textarea` use `font-size: inherit`, so controls are 16px by default (the base also avoids iOS zoom-on-focus). Where a control must be smaller, the Shadcn primitives use `md:text-sm` explicitly; anywhere else a deliberate size override has to use Tailwind's important modifier (`!text-sm`, `sm:!text-lg`), so exceptions are visible and greppable.

### Hierarchy

| Token                        | Size                   | Weight | Line height | Use                                                                    |
| ---------------------------- | ---------------------- | ------ | ----------- | ---------------------------------------------------------------------- |
| `{typography.display-logo}`  | 40px (6vw under 580px) | 800    | 1.0         | `Logo` wordmark only                                                   |
| `{typography.heading-xl}`    | 20px (`text-xl`)       | 600    | 1.4         | `EmptyState` title, section headings, dialog-level titles              |
| `{typography.heading-lg}`    | 18px (`text-lg`)       | 600    | 1.0         | `DialogTitle`, toast title, table header text                          |
| `{typography.card-title}`    | 16px                   | 600    | 1.0         | `CardTitle` (always `text-title`)                                      |
| `{typography.body-md}`       | 16px                   | 400    | 1.5         | Default body, inputs, `EmptyState` description                         |
| `{typography.button-auth}`   | 20px (`text-xl`)       | 700    | 1.4         | `auth` Button                                                          |
| `{typography.button-social}` | 18px (`text-lg`)       | 700    | 1.55        | `social` Button                                                        |
| `{typography.label-md}`      | 14px (`text-sm`)       | 500    | 1.43        | Default Button label, field labels, tab triggers                       |
| `{typography.body-sm}`       | 14px (`text-sm`)       | 400    | 1.43        | `CardDescription`, `Alert` body, `BadgeTag`, helper text, field errors |
| `{typography.caption}`       | 12px (`text-xs`)       | 500    | 1.33        | Badges, select group labels, textarea character counter                |

### Principles

- **Weight, not family, carries hierarchy.** 400 for reading, 500 for labels and controls, 600 for titles, 700–800 for the expressive track and the logo. Never go below 400 or use the thin weights (100–300) for UI text, even though they are loaded.
- **Titles use the `title` colour; descriptions use `muted-foreground`.** Together they form the standard heading/subheading pair on cards, dialogs, sheets and empty states.
- **Don't shrink to fit.** Prefer wrapping, truncation with a tooltip, or a different layout over dropping below 14px. 12px is for badges and counters only.
- **Large-screen scaling is a tight exception.** `OutsideInput` bumps to `2xl:text-xl!` on very wide screens; this is not a pattern to repeat on workspace controls.
- **The logo scales with the viewport on phones** (`text-logo-sm` = 6vw, `size-logo-icon` = 10vw under 580px) so the wordmark never wraps in headers.

## Layout

### Spacing System

- **Base unit**: Tailwind's 4px step. Prefer multiples of 4; 8, 12, 16, 24 and 32 cover nearly all layout.
- **Semantic tokens** (declared in `@theme`):
  - `{spacing.control}` `0.5rem`. Internal gaps inside compact controls and control groups (`gap-control`).
  - `{spacing.page}` `1.25rem`. Page-level insets around main content.
  - `{spacing.section}` `1.5rem`. Vertical rhythm between sections on a page.
  - `{spacing.card}` `1.5rem`. Card padding (`py-card`, `px-card`) and the gap between a card's header, content and footer (`gap-card`).
- **Component paddings that recur**: buttons 16px horizontal (12px with a leading icon, 8px for `sm` icon buttons); inputs 12px; badges 8px × 2px; alerts 16px × 12px; dialogs 24px; `EmptyState` icon disc 24px; sheet header/footer 16px.
- **Rule**: if a value has a semantic token, use the token. Don't type `p-6` where `p-card` is meant, because a future density change would miss it.

### Grid & Container

- **Landing**: centred content with progressively wider horizontal margins; pricing collapses from multi-column to a stacked list. Footer is a multi-column link block.
- **Workspace**: the shared `SidebarLayout` (sidebar + `HeaderDashboard` + inset content area). Pages are vertical stacks of `ContentSection` blocks separated by `{spacing.section}`. Don't build page-specific shells.
- **Dense data**: lists and tables sit inside cards or directly on the canvas; use `grid-cols-category-row` (`48px 1fr auto`), `grid-cols-category-row-lg`, `grid-cols-profile-section` (`140px 1fr`) and `grid-cols-legal` (`250px minmax(0,42rem)`) for the existing row patterns instead of inventing new templates.
- **Extra-wide**: a custom `3xl` breakpoint (1800px) exists for very large monitors.
- **Reading column**: legal and long-form content constrains to `42rem` next to a table of contents.

### Whitespace Philosophy

The workspace is compact and scannable. Whitespace is spent between sections (`{spacing.section}`), not inside controls (`{spacing.control}`). The expressive track is more generous: auth and plan pages centre a single column with large pill buttons and let the canvas breathe. Empty states are the exception that deliberately spends space: a 24px icon disc, a 24px stack gap, and a top margin to give a quiet page a clear next action.

## Elevation & Depth

| Level | Treatment                                                         | Use                                                                         |
| ----- | ----------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 0     | Flat. Border only                                                 | Outline buttons on dark, table rows, alerts, `ghost`                        |
| 1     | `shadow-xs` (hairline drop)                                       | Buttons (filled variants and `outline`), inputs, checkbox, switch, textarea |
| 2     | `shadow-sm`                                                       | `Card`, active `TabsTrigger`                                                |
| 3     | Popover / dropdown / select surface with border and larger shadow | Floating menus                                                              |
| 4     | `{colors.overlay}` scrim + dialog surface                         | `Dialog`, `AlertDialog`, `Sheet`, `Drawer`                                  |

Rules:

- **Borders do most of the work.** A card is a `border` + `shadow-sm` on the `card` surface; an input is a `border-input` outline. Don't add heavy drop shadows to stand a surface up.
- **Dark mode flattens further.** Borders become 10–15% white and inputs gain a translucent fill. Surfaces separate by luminance (`#121212` canvas, darker card), not by shadow.
- **Focus is the strongest visual state.** A 3px `ring-ring/50` plus `border-ring` is deliberately more prominent than any shadow.
- **Invalid is a state, not a variant.** `aria-invalid` swaps border to `destructive` and ring to `destructive/20` (`/40` in dark) on every control.

## Shapes

### Border Radius Scale

The system derives all radii from `--radius: 0.625rem` (10px) in `globals.css`:

| Token            | Value  | Tailwind                      | Use                                                                                        |
| ---------------- | ------ | ----------------------------- | ------------------------------------------------------------------------------------------ |
| `{rounded.xs}`   | 4px    | `rounded-[4px]`, `rounded-xs` | Checkbox, dialog close button, tooltip arrow                                               |
| `{rounded.sm}`   | 6px    | `rounded-sm` (`radius − 4px`) | Small chips, menu items                                                                    |
| `{rounded.md}`   | 8px    | `rounded-md` (`radius − 2px`) | **Buttons, inputs, badges, selects, tabs triggers, skeletons**. The default control radius |
| `{rounded.lg}`   | 10px   | `rounded-lg` (`radius`)       | Alerts, tab-list track, dialogs, `OutsideInput`, toasts                                    |
| `{rounded.xl}`   | 14px   | `rounded-xl` (`radius + 4px`) | **Cards**                                                                                  |
| `{rounded.pill}` | 9999px | `rounded-full`                | `plans`, `auth`, `social` buttons; `Switch`; avatar; `EmptyState` icon disc; spinners      |

### Shape Rules

- **Controls are 8px; containers are 10–14px.** An element inside a card should have a smaller radius than the card, so the corners nest naturally.
- **Pills are an expressive-track device.** `plans`, `auth` and `social` buttons are pills; `title`, `default`, `secondary`, `outline`, `ghost` and `destructive` are not. Don't pill a workspace button to make it "friendlier".
- **Never mix radii on one control.** Don't set a custom radius on a Shadcn primitive; if a new shape is needed, add a variant.
- **Circular media**: avatars, the empty-state disc and the spinner are circles. Product media and thumbnails (`ImageThumb`, `VideoThumb`, `SingleImagePreview`) use the control radius.
- **Brand mark**: the logo is a raster mark next to a wordmark. It is never placed inside a clipping container, and uses `object-contain`.

## Components

Components follow Atomic Design (atoms → molecules → organisms → templates) on top of the Shadcn/Radix primitives in `components/shadcn/ui`. Compose new UI from the entries below before creating anything new.

### Buttons

All buttons come from one `cva` definition (`button.tsx`). Shared base: `inline-flex`, centred, 8px gap, `rounded-md`, `text-sm font-medium`, pointer cursor, icons auto-sized to 16px and non-interactive, `3px` focus ring, and `aria-invalid` ring/border. Every variant dims to 50% opacity and ignores pointer events when disabled.

**Sizes**

| Size      | Height    | Padding                                    | Notes                                 |
| --------- | --------- | ------------------------------------------ | ------------------------------------- |
| `default` | 36px      | 16px × 8px (12px when it contains an icon) | Standard                              |
| `sm`      | 32px      | 12px (10px with icon), 6px gap             | Dense toolbars                        |
| `lg`      | 40px      | 24px (16px with icon)                      | Prominent form actions                |
| `xl`      | 48px      | 32px (20px with icon)                      | Hero and onboarding                   |
| `icon`    | 36 × 36px | n/a                                        | Icon-only; must carry an `aria-label` |

**Workspace variants**

- **`button-title`** (`variant="title"`): the dominant workspace action. `{colors.title}` fill with `{colors.primary-foreground}` text; hover drops to 90% opacity. Black in light mode, white in dark. It is the default for `SaveButton`, `EmptyState`'s call to action and the primary action in dialogs/forms. One per view.
- **`button-default`** (`variant="default"`): brand-purple fill, `shadow-xs`, hover at 90%. Use for brand-forward actions (upgrade, publish, create store) rather than the routine submit.
- **`button-secondary`** (`variant="secondary"`): emerald fill, white text, hover at 80%. Confirming or growth-positive actions.
- **`button-outline`** (`variant="outline"`): bordered, `background` fill, `shadow-xs`; hover fills with `accent`. In dark mode the fill becomes `input/30` and hover `input/50`. The default for `CancelButton` and `LoadMoreButton`.
- **`button-ghost`** (`variant="ghost"`): no fill, no border; hover fills with `{colors.hover}` (dark: `accent/50`). Toolbars, row actions, icon buttons, sidebar items.
- **`button-link`** (`variant="link"`): `{colors.primary}` text, underline on hover, 4px underline offset.
- **`button-destructive`** (`variant="destructive"`): `{colors.destructive}` fill, white text; 60% fill in dark mode. Confirmed delete/remove in dialogs.
- **`button-danger`** (`variant="danger"`): solid `{colors.error}` fill; hover flips to `title` (black in light, white-with-black-text in dark). The loudest red. Reserve it for irreversible account or store-level actions.

**Expressive variants** (pill)

- **`button-plans`** (`variant="plans"`): full-width pill, purple fill, white text; hover turns black. Pricing-plan selection.
- **`button-auth`** (`variant="auth"`): full-width pill, 20px bold white text, `py-3`; hover turns black; when disabled it goes **black** (not faded), signalling "submitting". Login, register, reset password.
- **`button-social`** (`variant="social"`): pill filled with `{colors.primary-tint}`, 18px bold. Used by `SocialAuthButtons` and `ProfileSocialButton`.

**Composite buttons (atoms)**: `SaveButton` (title variant, save icon, swaps to `SpinLoader` while pending), `CancelButton` (outline, X icon), `DoneButton`, `BackButton`, `LoadMoreButton` (outline, loader icon when fetching), `ButtonLoadable` (any variant, swaps content for `CartLoader`), `ButtonLanguage`, `NotificationButton`, `ThemeToggle`, `DeleteProduct`, `RestoreProduct`, `ArchivedProduct`, `LogoutConfirmDialog`. Always extend one of these before building a new action button.

### Form Controls

**`text-input`**: the Shadcn `Input`. 36px tall, `rounded-md`, transparent fill with `border-input` and `shadow-xs`. Text is 16px on mobile and 14px from `md` upward. Placeholder uses `muted-foreground`; selection colour is `title` on `primary-foreground`. Dark mode adds a 40% `input` fill. Focus: `border-ring` and a 3px `ring-ring/50`. Invalid: `border-destructive` and `ring-destructive/20`. File inputs are 28px tall with a bold 14px label.

**`text-input-outside`**: `OutsideInput`, the authentication input. A 56px tall, `rounded-lg` field with a **primary-purple border**, 16px horizontal padding, and an external 14px/500 label sitting above it (`mb-1`). Focus thickens to a 2px purple ring; error switches border and ring to `destructive` and prints the message below in 14px destructive. Used on the expressive track (login, register, reset). Don't use it inside workspace forms.

**Other fields**: `Textarea` (same border/fill as the input, optional character counter 12px `muted-foreground` at bottom-right), `Select` (input-style trigger with a chevron at 50% opacity, floating popover content, 12px `muted-foreground` group labels, check-mark indicator on selected item), `Combobox` / `Command` (searchable lists; `CountryCombobox` and `StateCombobox` wrap it), `Checkbox` (16px, `rounded-[4px]`, `title` fill when checked; `primary` in dark), `RadioGroup`, `Switch` (32 × 18px pill, `title` when on, `input` when off), `ToggleGroup` / `Toggle`, `Calendar`, `Label`, `Field`, `Form` (React Hook Form + Zod).

**Field composites**: `FormFieldSkeleton` (loading placeholder), `TagInputFormField`, `TagSelectFormField`, `RemovableTagList`, `ReorderableFieldArray`, `ArrayItemBox`, `FormActions` (the save/cancel footer), `SearchBar` (input with a 16px leading search icon and `pl-10`), `FileDropZone`, and the media uploaders (`MediaUploader`, `SingleMediaUploader`, `MultipleMediaUploader`, `ImageThumb`, `VideoThumb`, `SingleImagePreview`, `CarouselMedia`).

### Cards & Containers

**`card`**: `{colors.card}` surface, `{colors.card-foreground}` text, `rounded-xl`, 1px border, `shadow-sm`. Vertical padding and gap are `{spacing.card}`. Slots: `CardHeader` (grid; supports an action in the top-right via `CardAction`), `CardTitle` (`text-title`, 16px, semibold, leading-none), `CardDescription` (14px `muted-foreground`), `CardContent` and `CardFooter` (both `px-card`; a bordered footer adds top padding).

**`ContentSection`**: the molecule that wraps a page section (heading, description, content) in the workspace.

**`alert`**: 10px radius, 1px border, 16px × 12px padding, 14px text, optional leading icon pinned top-left with the body indented 28px. `default` uses `background`; `destructive` tints text, icon and a 50% border in `destructive`.

**`separator`**, **`scroll-area`**, **`accordion`**, **`collapsible`**: structural helpers; they inherit `border` and don't introduce new colours.

### Navigation

- **Sidebar** (`Sidebar`, `SidebarLayout`, `shadcn/ui/sidebar`): uses the `sidebar-*` roles (near-white in light, near-black in dark), item hover with `sidebar-accent`, and a distinct `sidebar-ring`. Items are ghost-like rows with a 16px icon and 14px label.
- **`HeaderDashboard`** and **`SiteHeader`**: top bars for workspace and public pages. The header transitions size on scroll via `transition-header-size`.
- **`Tabs`** (`tabs-list`, `tabs-trigger-active`): a 36px `muted` track with 3px inset and `rounded-lg`; the active trigger lifts to `background` with `shadow-sm` and, in dark mode, an `input` border. `PricingTabs` composes this for plan billing periods. The selected state of `transition-tab` animates colour and shadow only.
- **`Breadcrumb`**, **`dropdown-menu`**, **`command`**: popover-based navigation and menus using the `popover` surface.
- **`Footer`** and **`LinkFooter`**: public-site footer and its muted link style; **`LinkText`** is the inline text link atom.
- **`TablePagination`** and **`SortableHeader`**: table navigation and column sorting.

### Overlays

- **`dialog`**: centred panel on a `bg-black/50` scrim, 10px radius, 24px padding, title 18px/600, description 14px `muted-foreground`, header text centred on mobile and left-aligned from `sm`. Close button is a 16px X at 70% opacity (100% on hover) with a focus ring and an offset. `max-h-dialog` (90vh) caps height.
- **`alert-dialog`**: the same shell for destructive confirmations; pair its confirm action with `destructive` or `danger`, and its cancel with `outline`.
- **`sheet`** and **`drawer`**: edge-anchored panels with 16px header/footer padding; `h-drawer` is 85vh.
- **`popover`**, **`tooltip`** (inverted: `title` background, `primary-foreground` text, rotated square arrow), **`dropdown-menu`**.

### Data Display

- **`table`**: `background` surface, header text 18px, rows with a bottom border and `muted/50` hover, selected rows `muted`. Wrapped in a horizontal scroll container. `TableSkeleton` provides the loading state; `SortableHeader` provides the sort affordance.
- **`badge`** (`badge-default`, `badge-secondary`, `badge-destructive`, `badge-outline`): 12px/500, `rounded-md`, 8px × 2px padding, 12px icons. `default` is the title colour, `secondary` is emerald, `destructive` is red, `outline` is border-only.
- **`badge-tag`** (`BadgeTag`): a `secondary` Badge overridden to the `background` canvas colour with `foreground` text at 14px (dark: `border` fill). The neutral tag for categories, product tags and labels.
- **`avatar`**: circular; fallback shows initials.
- **`chart`**: Recharts wrapper using the `chart-*` series.
- **`carousel`** (`embla` utility): media and product galleries; thumbnails use `basis-thumb` (15%) and `basis-thumb-sm` (23%).
- **`SortControls`**: a molecule that pairs `SortBySelect` and `SortOrderSelect` in a `flex-row` with an 8px gap. Options are Name, Created date, Updated date; the sort type comes from `SortBy` / `SortOrder` in `@lib/types/sort`. `SortByControl`, `ProductSortBySelect` and `SortableHeader` are the variants for other contexts.
- **`TableOfContents`**: sticky in-page anchor list for legal content.

### Feedback & States

- **Toasts** (`sonner`): three skins applied through `.success-toast`, `.warning-toast` and `.error-toast`. Each is a solid `secondary` / `warning` / `error` fill with a matching 1px border and white text, a 16px leading icon, an 8px icon gap, an 18px/600 title and a 16px description at 90% opacity. Toasts are clickable (`cursor: pointer`, no text selection) to dismiss.
- **`EmptyState`** (molecule): centred column with an icon in a 24px-padded circular disc (`hover` fill, dark `muted`), a 48px `muted-foreground` icon, a 20px/600 title, a `muted-foreground` description capped at `max-w-md`, and an optional action rendered as a Button (`title` variant by default, `text-base`, with an optional 16px leading icon). Always pair a cause with a next step.
- **Loading**:
  - `Skeleton` is a `hover`-coloured, pulsing, `rounded-md` block; `SkeletonWrapper`, `FormFieldSkeleton` and `TableSkeleton` compose it.
  - `SpinLoader` is a rotating ring (sizes 16 / 32 / 48 / 64px, borders thin / normal / thick, variants default / primary / secondary), centred in a full-height container by default.
  - `CartLoader` is the brand's primary loader: a looping Lottie shopping cart exposed as `role="status"` with an `aria-label`. `size` is in Tailwind spacing units (12 = 3rem). It is passed as a `--cart-size` custom property and sized by the `size-cart-loader` utility in `globals.css`, so any value works. Use it for page and section loads and for `ButtonLoadable`.
  - `AnimatedBackground` is decorative motion for landing/auth backgrounds; it is never used behind workspace content.
  - `animate-water-fill` (2s ease-in-out infinite) fills the upload progress button.

### Brand & Identity

- **`Logo`**: an interactive button with the logo mark (60 × 64) and the "EasyStore" wordmark. The wordmark is `text-title`, `font-extrabold`, 40px by default (`text-logo`); under 580px both mark and wordmark scale with viewport width. Clicking always scrolls smoothly to the top and then, if `redirectTo` is set, navigates there. Passing a `text-*` class in `className` overrides the wordmark size and neutralises the mark's fixed size.
- **`LogoImage`**: the mark alone (`/logo.webp`, `object-contain`) with an optional `src` and `alt` override. Use where only the mark is wanted (favicons, compact sidebar, auth cards).
- Never recolour, outline, rotate or crop the logo mark.

### Signature Components

- **Pill action stack** (auth): `OutsideInput` fields → full-width `auth` pill → a divider → `social` pills → `LinkToLogin` / `LinkToRegister`. The purple border on the inputs echoes the purple pill, which is the entire personality of the expressive track.
- **Save-on-change profile** (`/profile`): fields are always editable and have no per-field edit or save buttons. Edits live in a draft (`ProfileDraftProvider`); once anything differs from the saved profile, a persistent top-center bar (`UnsavedChangesToast`, shown through the `useUnsavedChangesToast` hook), "You have unsaved changes", offers **Save** (`title` button) or **Cancel** (`outline` button), both `lg` size, on a `card` surface with a border (one validated request, success toast) (restores every field, including the logo uploader). Use this pattern for pages whose data is already filled in.
- **Title-button workspace form**: stacked `ContentSection` cards with Shadcn fields and a `FormActions` footer (`CancelButton` outline + `SaveButton` title). One dominant black/white action per form.
- **Plan cards** (`Pricing`, `PricingTabs`, `CardPlan`, `HeaderPlan`, `LiPlan`, `ButtonPlan`): a card per plan with a heading, feature list and a full-width `plans` pill CTA; hover blackens the CTA.
- **Inventory / category rows**: grid rows using `grid-cols-category-row*`, a 48px thumbnail slot, a flexible title column and trailing actions, with `CategoryRelationRemoveButton` for relation management.

## Do's and Don'ts

### Do

- Use semantic tokens (`bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, `bg-hover`) so one component renders correctly in both themes.
- Use the `title` Button variant for the main workspace action and the `auth` / `plans` / `social` variants only on the expressive track.
- Keep one primary action per view. Everything else is `outline`, `ghost` or `link`.
- Use `{spacing.card}`, `{spacing.section}`, `{spacing.page}` and `{spacing.control}` instead of repeating raw spacing for the same purpose.
- Keep every interactive element's 3px focus ring; add `aria-invalid` instead of manual red borders.
- Make every icon-only control accessible: `aria-label` on the button, `sr-only` text on close buttons, `role="status"` plus a label on loaders.
- Pair destructive actions with an `AlertDialog` confirmation; use `destructive` for the confirm button and `danger` only for account- or store-level irreversible actions.
- Use `EmptyState` with a next step instead of a blank area, and `Skeleton` / `SkeletonWrapper` to preserve layout while loading.
- Pass user-facing text through `next-intl`. Design for strings 30–40% longer than English (German, Spanish) and for RTL-neutral layouts.
- Add a Storybook story and extend an existing variant before introducing a new component.

### Don't

- Don't add a colour, radius, shadow or font family for one page when a token or primitive exists. If a token is truly missing, add it to `globals.css` and to this file.
- Don't hard-code hex values or Tailwind palette colours (`border-gray-300`, `bg-[#EBDBF5]`) in components. If a token is missing, add it to `globals.css`, to `@theme inline`, and to this file.
- Don't use purple for body text or for large surface fills in the workspace; it is an accent and an action colour.
- Don't use pill buttons in forms, tables or dialogs on the workspace track.
- Don't use `error` and `destructive` interchangeably: `error` is a solid status/action fill, `destructive` is validation and confirm-delete.
- Don't put text colours other than `foreground`, `title`, `muted-foreground` or `primary-foreground` on neutral surfaces; white text is only for the saturated fills (secondary, danger, destructive, auth, plans, toasts).
- Don't build a new spinner, empty state, tag, sort control or save/cancel pair. Reuse `SpinLoader` / `CartLoader`, `EmptyState`, `BadgeTag`, `SortControls`, `SaveButton` / `CancelButton`.
- Don't build Tailwind class names from variables (`w-${size}`); Tailwind can't generate them. Use fixed classes, or drive the value through a CSS variable or inline style as `CartLoader` does.
- Don't set body or control text below 14px, and don't use weights under 400.
- Don't animate layout-critical properties except where the system already does (`transition-header-size`, `transition-tab`).

## Responsive Behavior

### Breakpoints

Tailwind 4 defaults plus one extra step:

| Name          | Min width | Key changes                                                                                                                                          |
| ------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base (mobile) | 0         | Single column; logo scales with viewport under 580px; inputs and buttons use 16px text; dialog header centred; sidebar becomes an off-canvas `Sheet` |
| `sm`          | 640px     | Dialog header left-aligns; footers go inline; `EmptyState` centres with an auto margin                                                               |
| `md`          | 768px     | Inputs drop to 14px; sidebar docked; two-column forms                                                                                                |
| `lg`          | 1024px    | Full workspace layout; multi-column pricing                                                                                                          |
| `xl`          | 1280px    | Wider content region                                                                                                                                 |
| `2xl`         | 1536px    | `OutsideInput` text scales up to 20px                                                                                                                |
| `3xl`         | 1800px    | Custom breakpoint for ultra-wide monitors                                                                                                            |

A `max-[580px]` query is used specifically for the logo, because it sits in a header whose width is shared with other controls.

### Touch Targets

- Default Button and Input are 36px tall; `lg` is 40px and `xl` is 48px. On touch-first pages (auth, onboarding, plan selection) use the `auth` / `plans` / `social` pills or `lg` / `xl` sizes so targets reach 44px.
- `icon` buttons are 36 × 36px. Give toolbar icon buttons adequate spacing (`gap-2` minimum) so adjacent targets don't overlap.
- The `OutsideInput` is 56px tall and always meets the minimum.
- Dialog and sheet close buttons are 16px glyphs; keep the hit area padded by the surrounding control and never remove it.

### Collapsing Strategy

- Navigation: the workspace sidebar collapses to an off-canvas sheet, and the header keeps the logo, a menu trigger and key actions.
- Tables: horizontal scroll inside a full-width wrapper; use `ScrollArea` for very wide data, and `TableSkeleton` while loading. Consider a stacked-card representation for mobile product lists.
- Grids: `grid-cols-profile-section` and `grid-cols-category-row*` are fixed-leading-column grids; their trailing column should wrap or truncate, not push the row wider than the viewport.
- Sort and filter controls: `SortControls` stays in a single row until narrow, then the controls take `sortsClassName` widths to share the row.
- Media: the carousel's thumbnail strip changes basis from 15% to 23% on smaller viewports to keep thumbnails tappable.
- Long translated strings: prefer wrapping for labels and descriptions, truncation with `title`/tooltip for table cells and tags, and never fixed widths on text-bearing controls.

### Theming

Dark mode is a class toggle (`.dark`, driven by `ThemeProvider` and `ThemeToggle`). Components must not branch on theme except through the existing `dark:` modifiers that adjust translucency (inputs, outline buttons, destructive fills, tab triggers).

## Iteration Guide

1. Work on one component at a time and check it in Storybook in both themes and in at least one long-string locale.
2. Reference tokens by name (`{colors.primary}`, `{rounded.md}`, `{spacing.card}`, `{typography.label-md}`). If a value has no token, decide first whether it should.
3. Choose the track before choosing the component: **expressive** (pills, purple, bold) for public/auth/plan pages; **workspace** (title buttons, 8px controls, hairline cards) for everything behind login.
4. Default to `Button variant="title"` for a workspace primary action, `outline` for cancel, `ghost` for tertiary and icon actions.
5. New variants are added to the existing `cva` definitions as separate entries, never as one-off `className` overrides. Variants vary fill, border and weight, not shape within a track.
6. Use `var(--font-size-default)` as the baseline and mark any exception with the important modifier so it stays visible.
7. Keep this file in sync with `app/[locale]/globals.css` and the primitives in `components/shadcn/ui`. After editing, run `npx @google/design.md lint DESIGN.md`.
