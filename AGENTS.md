# EasyStore Client

EasyStore Client is the multilingual web application for creating and managing
e-commerce stores. It uses Next.js 16 App Router, React 19, TypeScript, Tailwind CSS
4, Shadcn/Radix, next-intl, Apollo Client/GraphQL, React Hook Form, Zod, Storybook.

Project-specific component work is governed by
`.agents/skills/easystore-components/SKILL.md`; use the narrower installed skills it
routes to when their concern is involved.

## Agent routing

This policy is provider-agnostic: apply it with Codex, Claude, Gemini, or any other
AI system that can delegate work. Start every request with
`.agents/agents/orchestrator.agent.md`. The Orchestrator is the only profile that
coordinates work; it must summon a separate agent for each delegated role and pass
that agent the corresponding profile.

Select models by capability tier, using the best available model from the active
provider. The examples below are illustrative, not dependencies on a model family.

Before launching or delegating any subagent, the Orchestrator must inform the user
of the exact model and reasoning level or variant that will be used for that
subagent (for example, `GPT-5.6 Luna, Light`). If the platform does not expose a
separate reasoning level, report the available model variant or capability tier
instead. This notice applies to every delegated subagent and must not promise
model details the platform does not expose.

| Delegated task                                                            | Profile              | Model requirement                                                                                              |
| ------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| Focused repository inspection, UI tracing, and evidence gathering         | `explorer.agent.md`  | Lowest capable tier (for example, GPT-5.6 Luna with low reasoning)                                             |
| Implementation-ready plan, architecture decision, or cross-cutting design | `architect.agent.md` | Highest available tier (for example, GPT-6 Astra with high reasoning or GPT-5.6 Sol)                           |
| Approved implementation                                                   | `coder.agent.md`     | Mid-capability tier suited to code changes (for example, GPT-5.6 Terra with medium reasoning or Claude Sonnet) |
| Reproducible failure Coder could not resolve in scope                     | `debugger.agent.md`  | Mid-to-high tier selected for the failure                                                                      |

For work that needs a plan, Orchestrator delegates Explorer, then Architect with the
evidence brief, then Coder with the approved plan. Small, self-contained changes may
go directly to Coder. Use Debugger only after an unresolved reproducible failure.

## Behavior

- Be direct and concise. Lead with the result, evidence, risk, or decision.
- Use only the context needed for the task and preserve unrelated worktree changes.
- Prefer the smallest complete change; do not broaden scope or weaken quality gates.
- Read the relevant version-matched guide under `node_modules/next/dist/docs/` before
  writing Next.js code, and read `DESIGN.md` before UI or styling changes.
- Follow the project skill routing instead of duplicating implementation standards in
  this file.
- Ask only when a missing decision materially affects behavior, a public contract,
  data, security, accessibility, or destructive impact.
- Do not add dependencies, expose secrets, perform destructive operations, or make
  externally visible breaking changes without explicit approval.
- Report exact verification evidence and distinguish current-task failures from
  pre-existing ones.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
