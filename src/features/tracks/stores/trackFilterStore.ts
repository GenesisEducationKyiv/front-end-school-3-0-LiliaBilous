import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { LocationQuery } from 'vue-router'

export const useTrackFilterStore = defineStore('trackFilterStore', () => {
  // state
  const page = ref(1)
  const search = ref('')
  const artist = ref('')
  const genres = ref<string[]>([])
  const sort = ref('')

  // actions
  const isFilterActive = computed(() => {
    return search.value || artist.value || genres.value.length > 0
  })
  function setPage(value: number) {
    page.value = value
  }

  function resetFilters() {
    search.value = ''
    artist.value = ''
    genres.value = []
    sort.value = ''
    page.value = 1
  }
  function initFromQuery(query: LocationQuery) {
    search.value = typeof query.search === 'string' ? query.search : ''
    artist.value = typeof query.artist === 'string' ? query.artist : ''
    genres.value = typeof query.genre === 'string' ? [query.genre] : []
    sort.value = typeof query.sort === 'string' ? query.sort : ''
    page.value = typeof query.page === 'string' ? parseInt(query.page) || 1 : 1
  }

  return {
    search,
    artist,
    genres,
    sort,
    page,
    isFilterActive,
    setPage,
    resetFilters,
    initFromQuery,
  }
})
