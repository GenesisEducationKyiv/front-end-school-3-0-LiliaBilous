import { watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTrackFilterStore } from '@/features/tracks/stores/trackFilterStore.ts'

export function useSyncFiltersWithUrl() {
  const router = useRouter()
  const route = useRoute()
  const store = useTrackFilterStore()

  onMounted(() => {
    store.initFromQuery(route.query)
  })

  watch(
    () => ({
      search: store.search,
      artist: store.artist,
      genre: store.genres.join(','),
      sort: store.sort,
      page: store.page,
    }),
    (newQuery) => {
      router.replace({
        query: {
          ...cleanQuery(newQuery),
        },
      })
    },
    { deep: true }
  )
}
function cleanQuery<T extends Record<string, string | number | undefined | null>>(
  query: T
): Partial<T> {
  const cleaned: Partial<T> = {}

  for (const key in query) {
    const value = query[key]
    if (value !== undefined && value !== null && value !== '' && !(key === 'page' && value === 1)) {
      cleaned[key] = value
    }
  }
  return cleaned
}
