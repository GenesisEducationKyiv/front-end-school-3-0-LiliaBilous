<template>
  <header class="toolbar">
    <div class="toolbar__container">
      <div class="toolbar__header">
        <button
          class="toolbar__button button"
          @click="dropdownOpen = !dropdownOpen"
          :aria-expanded="dropdownOpen"
          aria-controls="filters-section"
          aria-label="Toggle filters"
        >
          {{ dropdownOpen ? 'Hide Filters' : 'Show Filters' }}
          <span>{{ dropdownOpen ? '▲' : '▼' }}</span>
        </button>

        <button
          class="toolbar__button reset-button button"
          @click="resetAllFilters"
          :disabled="!isFilterActive"
          aria-label="Reset all filters"
        >
          Reset Filters <span>&times;</span>
        </button>
      </div>

      <div
        class="toolbar__body"
        v-if="dropdownOpen"
        id="filters-section"
        aria-label="Filter options"
      >
        <div class="toolbar__item">
          <label for="search-input" class="visually-hidden">Search tracks</label>
          <input
            id="search-input"
            class="toolbar__search input"
            data-testid="search-input"
            type="text"
            v-model="filterStore.search"
            @input="debouncedSearch"
            placeholder="Search..."
            aria-label="Search tracks by title or metadata"
          />
        </div>
        <div class="toolbar__item">
          <h3>Filter by Genre:</h3>
          <FilterTabGroup
            @modelValue="selectGenre"
            :options="availableGenres"
            v-model="filterStore.genre"
            ariaLabel=" Select genre"
            variant="genre"
          />
        </div>
        <div class="toolbar__item">
          <label for="filter-artist" class="">Filter by Artist</label>
          <input
            id="filter-artist"
            class="toolbar__filter-input input"
            data-testid="filter-artist"
            type="text"
            v-model="filterStore.artist"
            @input="debouncedSearch"
            placeholder="Filter by Artist"
            aria-label="Filter tracks by artist"
          />
        </div>
        <div class="toolbar__item">
          <h3>Sort by:</h3>
          <FilterTabGroup
            @modelValue="selectSort"
            :options="sortOptions"
            v-model="filterStore.sort"
            ariaLabel="Sort tracks"
            variant="sort"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { F } from '@mobily/ts-belt'
import { useTrackStore } from '@/features/tracks/stores/trackStore'
import { useTrackFilterStore } from '@/features/tracks/stores/trackFilterStore'
import { useTrackGenreStore } from '@/features/tracks/stores/trackGenresStore.ts'
import { useSyncFiltersWithUrl } from '@/shared/composables/useFiltersWithUrl'
import FilterTabGroup from '@/shared/components/FilterTabGroup.vue'

const route = useRoute()
const dropdownOpen = ref(true)
const filterStore = useTrackFilterStore()
const trackStore = useTrackStore()
const genreStore = useTrackGenreStore()
const availableGenres = computed(() => genreStore.genres)
const sortOptions = ['title', 'artist', 'album', 'createdAt']

function selectSort(value: string) {
  filterStore.sort = value
  trackStore.fetchTracks()
}
function selectGenre(genre: string): void {
  filterStore.genre = genre
  trackStore.fetchTracks()
}
function resetAllFilters() {
  filterStore.resetFilters()
  trackStore.fetchTracks()
}
const isFilterActive = computed((): boolean => {
  return !!filterStore.search || !!filterStore.artist || !!filterStore.genre || !!filterStore.sort
})
const debouncedSearch = F.debounce(() => {
  trackStore.fetchTracks()
}, 500)

useSyncFiltersWithUrl()
onMounted(() => {
  filterStore.initFromQuery(route.query)
  trackStore.fetchTracks()
  genreStore.fetchGenres()
})
</script>
