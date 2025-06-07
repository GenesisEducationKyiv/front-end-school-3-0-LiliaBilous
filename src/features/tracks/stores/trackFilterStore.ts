import * as Belt from '@mobily/ts-belt'
import { pipe } from '@mobily/ts-belt'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TrackQuery } from '@/features/tracks/schema/trackSchema.ts'
export const useTrackFilterStore = defineStore('trackFilter', () => {
  const search = ref('')
  const artist = ref('')
  const genre = ref('')
  const sort = ref('')
  const page = ref(1)

  function toQuery(): TrackQuery {
    return {
      page: page.value,
      limit: 10,
      search: search.value || undefined,
      artist: artist.value || undefined,
      genre: genre.value || undefined,
      sort: sort.value || undefined,
    }
  }

  function initFromQuery(query) {
    search.value = pipe(Belt.O.fromNullable(query.search), Belt.O.getWithDefault(''))

    artist.value = pipe(Belt.O.fromNullable(query.artist), Belt.O.getWithDefault(''))

    genre.value = pipe(Belt.O.fromNullable(query.genre), Belt.O.getWithDefault(''))

    sort.value = pipe(Belt.O.fromNullable(query.sort), Belt.O.getWithDefault(''))

    page.value = pipe(Belt.O.fromNullable(query.page), Belt.O.getWithDefault(1))
  }

  function resetFilters() {
    search.value = ''
    artist.value = ''
    genre.value = ''
    sort.value = ''
    page.value = 1
  }

  return {
    // state
    search,
    artist,
    genre,
    sort,
    page,

    // actions
    toQuery,
    initFromQuery,
    resetFilters,
  }
})
