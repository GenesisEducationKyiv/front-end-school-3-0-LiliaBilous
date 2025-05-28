# ADR 0005: Integrate ESLint with TypeScript

## Context

With the migration of the project to TypeScript (see [ADR 0004](./ADR-0004__TypeScriptMigration.md)), ensuring code consistency and enforcing type safety becomes essential. ESLint is already the industry standard for linting JavaScript/TypeScript, and using it with TypeScript-specific rules will improve code quality.

## Decision

We will configure ESLint to support TypeScript by:

- Installing `typescript-eslint` and related tooling
- Extending ESLint configuration with recommended TS and Vue rules:

  - `plugin:@typescript-eslint/recommended`
  - `plugin:vue/vue3-recommended`
  - Enabling strict rules for no `any`, `no-explicit-any`, and banning type assertions

- Using ESLint with Prettier if needed for formatting consistency
- Adding lint scripts to `package.json`

## Rationale

TypeScript can catch many issues, but without linting, developers might misuse the type system or produce inconsistent code. ESLint fills this gap and reinforces project conventions.

## Alternatives Considered

- **TSC only**: rejected — type checking alone doesn't enforce stylistic or structural code rules.
- **Custom lint rules only**: rejected — high maintenance and limited reuse compared to community packages.

## Status

Accepted

## Consequences

**Positive:**

- Enforced use of safe, idiomatic TypeScript
- Early error detection through static analysis
- Better code consistency and maintainability

**Negative:**

- Initial setup and learning curve
- Required developer discipline to follow lint rules
