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
    >
      <option data-testid="genre-add-option" value="">+ Add genre</option>
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
import { ref, computed, onMounted } from 'vue'
import { useTrackGenreStore } from '@/features/filters/store/trackGenresStore.ts'
import { storeToRefs } from 'pinia'

const props = defineProps<{ selected: string[] }>()
const emit = defineEmits<{ (e: 'update:selected', value: string[]): void }>()

const store = useTrackGenreStore()
const { genres } = storeToRefs(store)

const selectedOption = ref('')

onMounted(() => {
  if (store.genres.length === 0) {
    store.fetchGenres()
  }
})

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
