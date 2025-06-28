<template>
  <div class="pagination">
    <button data-testid="pagination-prev" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
      class="pagination-button">
      &laquo;
    </button>

    <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
      :class="['pagination-page', { active: page === currentPage }]">
      {{ page }}
    </button>

    <button data-testid="pagination-next" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
      class="pagination-button">
      &raquo;
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  maxVisible?: number
}>()

const emit = defineEmits<{
  (e: 'change', page: number): void
}>()

const maxVisible = computed(() => props.maxVisible ?? 5)

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages) {
    emit('change', page)
  }
}

const visiblePages = computed(() => {
  const half = Math.floor(maxVisible.value / 2)
  let start = props.currentPage - half
  let end = props.currentPage + half

  if (start < 1) {
    end += 1 - start
    start = 1
  }

  if (end > props.totalPages) {
    start -= end - props.totalPages
    end = props.totalPages
  }

  start = Math.max(start, 1)

  const pages: number[] = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.pagination-button,
.pagination-page {
  border-radius: var(--border-radius-0-5);
  border: 1px solid var(--color-glow-soft);
  background-color: var(--color-bg-glass);
  color: var(--color-text-base);
  backdrop-filter: blur(4px);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-button:hover,
.pagination-page:hover {
  background-color: var(--color-accent-glow-blue);
  border-color: var(--color-primary-cyan);
  color: var(--color-primary-cyan);
}

.pagination-page.active {
  background-color: var(--color-primary-cyan);
  color: var(--color-text-inverted);
  border-color: var(--color-primary-cyan);
}
</style>
