<template>
  <div class="filter-tabs" role="group" :aria-label="ariaLabel">
    <button v-for="option in options" :key="option" :class="['tab', variant, { active: modelValue === option }]"
      :aria-pressed="modelValue === option"
      :aria-label="modelValue === option ? `Unselect ${option}` : `Select ${option}`" @click="toggleOption(option)">
      {{ option }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: string[]
  modelValue: string | undefined
  ariaLabel: string
  variant: 'genre' | 'sort'
}>()

const emit = defineEmits(['modelValue'])

function toggleOption(option: string) {
  emit('modelValue', props.modelValue === option ? '' : option)
}
</script>
<style>
.filter-tabs {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tab {
  padding: 0.5rem 0.75rem;
  border-radius: var(--border-radius-1);
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  text-transform: capitalize;
  transition: var(--transition);
  color: var(--color-text-base);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: var(--box-shadow-button);
}

.genre {
  border-color: var(--color-primary-cyan);
  color: var(--color-primary-cyan);

  &.active {
    background-color: var(--color-primary-cyan);
    color: var(--color-text-inverted);
    box-shadow: var(--box-shadow-blue);
  }

  &:focus-visible,
  &:hover {
    color: var(--color-text-base);
    box-shadow: var(--box-shadow-blue);
  }
}

.sort {
  border-color: var(--color-primary-orange);
  color: var(--color-primary-orange);

  &.active {
    background-color: var(--color-primary-orange);
    color: var(--color-text-inverted);
    box-shadow: var(--box-shadow-1);
  }

  &:hover,
  &:focus,
  &:focus-visible {
    border-color: var(--color-primary-orange);
    color: var(--color-text-base);
    box-shadow: var(--box-shadow-1);
  }
}
</style>
