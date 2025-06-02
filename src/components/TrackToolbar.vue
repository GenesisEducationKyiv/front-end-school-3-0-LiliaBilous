<template>
  <header class="toolbar">
    <div class="toolbar__container">
      <div class="toolbar__actions">
        <button class="toolbar__button button" @click="dropdownOpen = !dropdownOpen" :aria-expanded="dropdownOpen"
          aria-controls="filters-section" aria-label="Toggle filters">
          {{ dropdownOpen ? 'Hide Filters' : 'Show Filters' }} <span>{{ dropdownOpen ? '▲' : '▼' }}</span>
        </button>

        <button class="toolbar__button reset-button button" @click="resetFilters" :disabled="!isFilterActive"
          aria-label="Reset all filters">
          Reset Filters <span>&times;</span>
        </button>
      </div>

      <div class="toolbar__body" v-if="dropdownOpen" id="filters-section" aria-label="Filter options">
        <div class="toolbar__filter-genre">
          <p>Filter by Genre:</p>
          <div class="genre-tabs" role="group" aria-label="Genre tabs">
            <button v-for="genre in availableGenres" :key="genre"
              :class="['genre-tab', trackStore.genres[0] === genre ? 'active' : '']" @click="selectGenre(genre)"
              :aria-pressed="trackStore.genres[0] === genre"
              :aria-label="trackStore.genres[0] === genre ? `Unselect genre ${genre}` : `Select genre ${genre}`">
              {{ genre }}
            </button>
          </div>
        </div>

        <div class="toolbar__footer">
          <label for="sort-select" class="visually-hidden">Sort tracks</label>
          <select id="sort-select" class="toolbar__sort input" data-testid="sort-select" v-model="trackStore.sort"
            @change="trackStore.fetchTracks" aria-label="Sort tracks">
            <option disabled value="">Sort By</option>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
            <option value="createdAt">Created At</option>
          </select>

          <label for="search-input" class="visually-hidden">Search tracks</label>
          <input id="search-input" class="toolbar__search input" data-testid="search-input" type="text"
            v-model="trackStore.search" @input="debouncedSearch" placeholder="Search..."
            aria-label="Search tracks by title or metadata" />

          <label for="filter-artist" class="visually-hidden">Filter by Artist</label>
          <input id="filter-artist" class="toolbar__filter-input input" data-testid="filter-artist" type="text"
            v-model="trackStore.artist" @input="trackStore.fetchTracks" placeholder="Filter by Artist"
            aria-label="Filter tracks by artist" />
        </div>
      </div>
    </div>
  </header>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import debounce from 'lodash.debounce'
import { getGenres } from '@/shared/services/api'
import { useTrackStore } from '@/features/tracks/stores/trackStore'
import type { Result } from 'neverthrow'

const trackStore = useTrackStore()

const availableGenres = ref<string[]>([])
const dropdownOpen = ref(true)

const debouncedSearch = debounce(() => {
  trackStore.page = 1
  trackStore.fetchTracks()
}, 500)

onMounted(async () => {
  const result: Result<string[], Error> = await getGenres()

  result.match(
    (genres) => {
      availableGenres.value = genres
    },
    (error) => {
      console.error('Failed to load genres:', error)
    }
  )
})

function selectGenre(genre: string): void {
  if (trackStore.genres[0] === genre) {
    trackStore.genres = []
  } else {
    trackStore.genres = [genre]
  }
  trackStore.page = 1
  trackStore.fetchTracks()
}

function resetFilters(): void {
  trackStore.search = ''
  trackStore.artist = ''
  trackStore.genres = []
  trackStore.sort = ''
  trackStore.page = 1
  trackStore.fetchTracks()
}

const isFilterActive = computed((): boolean => {
  return (
    !!trackStore.search ||
    !!trackStore.artist ||
    trackStore.genres.length > 0 ||
    !!trackStore.sort
  )
})
</script>
