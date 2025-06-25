<template>
  <div class="genre-wrapper">
    <label for="genre-select" class="form-label">Genres</label>
    <select
      id="genre-select"
      data-testid="genre-select"
      v-model="selectedOption"
      @change="handleSelect"
      class="form-input genre-select"
      aria-label="Select a genre to add"
      :disabled="isLoading || !!error"
    >
      <option data-testid="genre-add-option" value="">
        {{ isLoading ? 'Loading genres...' : error ? 'Failed to load genres' : '+ Add genre' }}
      </option>
      <option v-for="option in genreOptions" :key="option" :value="option">
        {{ option }}
      </option>
    </select>

    <div class="genre-container">
      <span
        v-for="(genre, index) in props.selected"
        :key="genre"
        class="genre-tag"
        data-testid="genre-tag"
      >
        {{ genre }}
        <button
          type="button"
          @click="removeGenre(index)"
          title="Remove genre"
          :aria-label="`Remove genre ${genre}`"
          data-testid="genre-remove-button"
        >
          &times;
        </button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGenreQuery } from '@/shared/composables/useGenreQuery.ts'
const { genres, isLoading, error } = useGenreQuery()
const props = defineProps<{ selected: string[] }>()
const emit = defineEmits<{ (e: 'update:selected', value: string[]): void }>()

const selectedOption = ref('')

const genreOptions = computed(() => genres.value.filter((genre) => !props.selected.includes(genre)))

function handleSelect() {
  if (selectedOption.value) {
    emit('update:selected', [...props.selected, selectedOption.value])
    selectedOption.value = ''
  }
}

function removeGenre(index: number) {
  const updated = [...props.selected]
  updated.splice(index, 1)
  emit('update:selected', updated)
}
</script>
