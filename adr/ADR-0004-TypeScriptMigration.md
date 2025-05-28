# ADR 0004: Migrate Project to TypeScript

## Context

The Track Manager project was initially implemented in JavaScript using Vue 3, Pinia, and Vite. As the project grows in complexity, the lack of static typing introduces risks such as runtime errors, unclear data structures, and reduced maintainability.

## Decision

We will migrate the codebase to TypeScript. This includes:

- Renaming relevant files from `.js` to `.ts` and `.vue` scripts to `<script lang="ts">`
- Introducing a strict `tsconfig.json` configuration
- Removing all `any`, `as unknown as`, and other unsafe type assertions
- Using:

  - Type guards and predicates to infer types safely
  - Zod for parsing and validating unknown data
  - Neverthrow for safe error handling without exceptions

## Rationale

TypeScript adds strong typing, editor tooling, and static analysis, reducing bugs and making the codebase more scalable and self-documenting. It improves reliability without requiring a major architectural overhaul.

## Alternatives Considered

- **Staying on JavaScript**: Rejected due to increased risk of bugs, low scalability, and difficult onboarding/testing.
- **Using JSDoc types**: Rejected due to limited enforcement and tooling vs. full TypeScript.

## Status

Accepted

## Consequences

**Positive:**

- Catch type errors at compile time
- Better developer tooling and autocomplete
- Improved documentation through types
- Safer refactoring and API usage

**Negative:**

- Initial migration effort and learning curve
- Need to rewrite or update existing JS files and typings
