# ADR 0001: Adopt Feature-Based Folder Structure to Improve Maintainability

## Context

The current project uses a type-based structure (e.g., all components, services, etc., live in separate global folders). While manageable at a small scale, this approach becomes inefficient as the application grows: it becomes harder to locate related files, increases the risk of conflicts and unintended coupling across unrelated modules, and hinders maintainability.

Since the Track Manager is expected to grow and be reviewed by other developers, a maintainable and scalable folder structure is critical.

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

### Advantages:

- Easier to group and locate related code
- Simplifies navigation and refactoring
- Scales better as features grow
- Reduces technical debt

Alternative - keeping the type-based structure: doesn’t scale well, makes refactoring harder, and increases complexity.

## Status

Proposed

## Consequences

### Positive:

- Easier to scale and maintain
- Logical and consistent structure
- Reduced inter-feature coupling

### Negative:

- Initial reorganization requires time
- Adaptation to the new structure is required
