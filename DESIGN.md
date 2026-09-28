---
version: alpha
name: EasyStore design system
description: Shared visual language for the EasyStore multilingual e-commerce platform and its store-management workspace.
colors:
  background: '#f3f4f6'
  foreground: '#423f3d'
  primary: '#bc5bf5'
  secondary: '#10b981'
  warning: '#f59e0b'
  error: '#dc2626'
  title: '#000000'
  hover: '#e6e7e9'
  card: 'oklch(1 0 0)'
  card-foreground: 'oklch(0.145 0 0)'
  popover: 'oklch(1 0 0)'
  popover-foreground: 'oklch(0.145 0 0)'
  primary-foreground: 'oklch(0.985 0 0)'
  secondary-foreground: 'oklch(0.205 0 0)'
  muted: 'oklch(94.912% 0.00011 271.152)'
  muted-foreground: 'oklch(0.556 0 0)'
  accent: 'oklch(0.97 0 0)'
  accent-foreground: 'oklch(0.205 0 0)'
  destructive: 'oklch(0.577 0.245 27.325)'
  border: 'oklch(0.922 0 0)'
  input: 'oklch(0.922 0 0)'
  ring: 'oklch(0.708 0 0)'
typography:
  sans:
    fontFamily: Inter
  default:
    fontSize: 1rem
rounded:
  base: 0.625rem
spacing:
  control: 0.5rem
  page: 1.25rem
  section: 1.5rem
  card: 1.5rem
---

## Overview

EasyStore uses a shared, utility-driven interface for storefront communication and operational workflows. The system combines a light neutral canvas, saturated purple primary actions, green secondary actions, and reusable Shadcn primitives.

## Colors

Use the semantic color tokens for application surfaces, content, actions, status feedback, and focus states. Primary and secondary colors identify the main and supporting actions; warning and error are reserved for status and destructive flows. Use foreground and title roles for text instead of introducing page-specific neutrals.

The `.dark` theme provides an alternate dark surface and content treatment while retaining the purple primary and green secondary accents. Components should consume semantic roles so the same markup remains usable across themes.

## Typography

Inter is the application sans-serif family and the default body size is `{typography.default.fontSize}`. The root layout loads the family with a complete weight range, so headings, labels, body copy, and controls should use weight changes within Inter rather than introducing another family.

## Layout

The product uses responsive Tailwind layouts. Public landing content is centered within progressively wider horizontal margins, while authenticated workspace pages use a shared sidebar, header, inset content area, and vertically stacked sections. Preserve the shared `SidebarLayout` structure for operational pages so navigation and page chrome remain consistent.

Use container-based responsive composition for dense dashboard content. Keep page sections grouped with the existing flex and grid spacing utilities; do not create page-specific layout tokens from isolated values.

Use `{spacing.control}` for compact control internals, `{spacing.page}` for page-level insets, `{spacing.section}` for shared vertical section rhythm, and `{spacing.card}` for card padding and internal grouping.

## Elevation & Depth

Cards and actionable controls use restrained shadows and borders to separate surfaces from the neutral background. Prefer the shared card surface and border roles, with elevation applied through the existing component variants rather than custom per-page shadows.

## Shapes

Use `{rounded.base}` as the system radius source. Shadcn components derive their smaller and larger radius variants from this base; preserve those relationships when composing buttons, cards, inputs, dialogs, and other primitives. Fully rounded shapes are reserved for explicitly pill-shaped actions such as plan and authentication buttons.

## Components

Shared components are organized through atomic layers and Shadcn primitives. Use the shared Button variants for primary, title, destructive, danger, outline, secondary, ghost, link, plan, social, and authentication actions instead of reproducing their color and focus behavior locally.

Cards use a consistent surface, border, radius, padding, title, description, content, and footer structure. Forms and interactive controls inherit the global body size and use the shared border, input, ring, and invalid-state roles.

Toast feedback uses the semantic warning, error, and secondary roles with white content and compact icon alignment. Keep status feedback distinct from ordinary buttons and content surfaces.

## Do's and Don'ts

- Do use semantic color roles and shared component variants so light and dark themes remain coherent.
- Do keep interactive focus styling visible through the shared ring treatment.
- Do use the shared Inter family and default size for controls unless a component has an intentional variant.
- Don't introduce a new color, radius, or font family for a single page when an existing semantic role or primitive applies.
