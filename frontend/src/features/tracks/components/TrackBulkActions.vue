<template>
  <div class="bulk__container">
    <label class="custom-checkbox">
      <input id="select-all" type="checkbox" :checked="selectAll" @change="toggleSelectAll" data-testid="select-all" />
      <span class="checkmark"></span>
      Select All
    </label>

    <button data-testid="bulk-delete-button" class="bulk__button button" :disabled="!selectedIds.length"
      @click="$emit('delete-selected')">
      Delete {{ selectedIds.length }} Selected
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  selectedIds: string[]
  selectAll: boolean
}>()

const emit = defineEmits<{
  (e: 'update:selectAll', value: boolean): void
  (e: 'delete-selected'): void
}>()

function toggleSelectAll(event: Event) {
  const checked = (event.target as HTMLInputElement).checked
  emit('update:selectAll', checked)
}
</script>

<style>
.bulk__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0 1rem 1rem;
}

.bulk__button {
  padding: 0.5rem 1.25rem;
  font-weight: 600;
  color: var(--color-primary-purple);
  background-color: transparent;
  border: 1px solid var(--color-primary-purple);

  &:hover {
    color: var(--color-text-base);
    background-color: var(--color-primary-purple);
  }

  &:focus,
  &:focus-visible {
    color: var(--color-text-base);
  }
}

.custom-checkbox {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 500;
  color: var(--color-text-base);
  cursor: pointer;
  user-select: none;

  &:focus,
  &:focus-visible {
    box-shadow: var(--box-shadow-button);
  }
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-checkbox .checkmark {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--color-primary-purple);
  border-radius: 50%;
  position: relative;
  background: transparent;
  transition: var(--transition);
}

.custom-checkbox input:checked~.checkmark {
  background-color: var(--color-primary-purple);
}

.custom-checkbox .checkmark::after {
  content: '';
  position: absolute;
  display: none;
}

.custom-checkbox input:checked~.checkmark::after {
  display: block;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid var(--color-text-base);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
