<template>
  <div class="bulk__container">
    <label class="custom-checkbox">
      <input
        id="select-all"
        type="checkbox"
        :checked="selectAll"
        @change="toggleSelectAll"
        data-testid="select-all"
      />
      <span class="checkmark"></span>
      Select All
    </label>

    <button
      data-testid="bulk-delete-button"
      class="bulk__button button"
      :disabled="!selectedIds.length"
      @click="$emit('delete-selected')"
    >
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
}

.bulk__button {
  color: var(--accent-color);
  border: 1px solid var(--accent-color);
  transition: all 0.3s ease-in-out;
}

.bulk__button:hover {
  background-color: var(--accent-color);
  color: var(--white-color);
}

.custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  gap: 0.5rem;
  user-select: none;
  color: var(--text-color);
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-checkbox .checkmark {
  height: 20px;
  width: 20px;
  background-color: var(--white-color);
  border: 2px solid var(--secondary-alt-color);
  border-radius: 50%;
  position: relative;
  transition: background-color 0.3s ease-in-out;
}

.custom-checkbox:hover .checkmark {
  background-color: var(--white-color);
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: var(--secondary-alt-color);
  border-color: var(--secondary-alt-color);
}

.custom-checkbox .checkmark::after {
  content: '';
  position: absolute;
  display: none;
}

.custom-checkbox input:checked ~ .checkmark::after {
  display: block;
}

.custom-checkbox .checkmark::after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid var(--white-color);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
