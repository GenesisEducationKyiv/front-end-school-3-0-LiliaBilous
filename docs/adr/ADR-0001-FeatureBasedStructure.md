# ADR 0001: Adopt Feature-Based Folder Structure to Improve Maintainability

## Context

The current project uses a type-based structure (e.g., all components, services, etc., live in separate global folders). While manageable at a small scale, this approach becomes inefficient as the application grows: it becomes harder to locate related files, increases the risk of conflicts and unintended coupling across unrelated modules, and hinders maintainability.

Since the **Track Manager** is expected to grow and be reviewed by other developers, a maintainable and scalable folder structure is critical.

## Decision

We will adopt a **feature-based folder structure**, grouping all related files by functionality rather than by type. For example:

```
src/
├── features/
│   ├── tracks/
│   │   ├── components/
│   │   │   ├── TrackList.vue
│   │   │   ├── TrackToolbar.vue
│   │   │   └── TrackWaveForm.vue
│   │   ├── modals/
│   │   │   ├── CreateTrackModal.vue
│   │   │   ├── EditTrackModal.vue
│   │   │   ├── UploadFileModal.vue
│   │   │   └── ConfirmDeleteModal.vue
│   │   ├── store/
│   │   │   └── trackStore.js
│   │   ├── services/
│   │   │   └── trackApi.js
│   │   ├── composables/
│   │   │   └── useTrackManager.js
│   │   └── TracksView.vue
│
├── shared/
│   ├── components/
│   │   ├── BaseButton.vue
│   │   └── Icon.vue
│   ├── services/
│   │   ├── fetchWrapper.js
│   │   └── toastService.js
│   ├── composables/
│   │   └── useModal.js
│   └── utils/
│       └── validation.js
│
├── router/
│   └── index.js
├── App.vue
├── main.js
```

Common utilities and base UI components will be placed in `src/shared/` or `src/common/`.

## Rationale

Switching to a feature-based structure just feels more natural: all the files for a particular feature live in one place, which makes it easier to work on something without touching unrelated code. It also helps avoid coupling between features, since you’re less tempted to "just import" something from another part of the app. Refactoring also becomes more straightforward when everything related is nearby.

Alternative - keeping the type-based structure: doesn’t scale well, makes refactoring harder, and increases complexity.

## Status

Proposed

## Consequences

After applying the new feature-based structure:

- The `src/features/` directory now contains all feature-specific logic, including UI, state, services, and composables for tracks
- The shared utilities and base components were moved to `src/shared/`, clarifying what is generic vs. feature-specific
- Refactoring became easier — changes to a feature usually require touching fewer files scattered across the codebase
- Developers now spend less time navigating between folders, since most logic for a feature lives in one place

Negative:

- The reorganization required updating many import paths and rethinking file locations
- Some developers needed time to adjust to the new conventions and folder layout
- A few shared modules were initially duplicated across features until we centralized them properly

## 🧭 Navigation

---

[⬅️ Previous](./ADR-0000-ADRGuide.md) | [🏠 Index(README)](./adr/README.md) | [ Next ➡️ ](./ADR-0002-LowCoupling&HighCohesion.md)
