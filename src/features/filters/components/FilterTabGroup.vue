<template>
  <div class="filter-tabs" role="group" :aria-label="ariaLabel">
    <button
      v-for="option in options"
      :key="option"
      :class="['tab', variant, { active: modelValue === option }]"
      :aria-pressed="modelValue === option"
      :aria-label="modelValue === option ? `Unselect ${option}` : `Select ${option}`"
      @click="toggleOption(option)"
    >
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
  border: 1px solid transparent;
  padding: 0.5rem 0.75rem;
  border-radius: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  text-transform: capitalize;
}

.genre {
  border: 1px solid var(--secondary-color);
  color: var(--secondary-color);
}

.genre.active,
.genre:hover {
  background-color: var(--secondary-color);
  color: var(--white-color);
}

.sort {
  border: 1px solid var(--secondary-alt-color);
  color: var(--secondary-alt-color);
}

.sort.active,
.sort:hover {
  background-color: var(--secondary-alt-color);
  color: var(--white-color);
}
</style>
