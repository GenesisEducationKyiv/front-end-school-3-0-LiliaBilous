import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTrackFilterStore } from '@/features/tracks/stores/trackFilterStore.ts'
import type { TrackQuery } from '@/features/tracks/schema/trackSchema.ts'

export function useSyncFiltersWithUrl() {
  const router = useRouter()
  const store = useTrackFilterStore()

  watch(
    () => ({
      search: store.search,
      artist: store.artist,
      genre: store.genre,
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

function cleanQuery(query: TrackQuery): Partial<Record<keyof TrackQuery, string | number>> {
  const cleaned: Partial<Record<keyof TrackQuery, string | number>> = {}

  for (const key in query) {
    const typedKey = key as keyof TrackQuery
    const value = query[typedKey]

    if (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      !(key === 'page' && (value === 1 || value === '1'))
    ) {
      cleaned[typedKey] = value
    }
  }

  return cleaned
}
