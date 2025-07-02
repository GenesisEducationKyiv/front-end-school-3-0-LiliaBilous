import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Result } from 'neverthrow'
import { getGenres } from '@/shared/services/api.ts'

export const useTrackGenreStore = defineStore('trackGenreStore', () => {
  const genres = ref<string[]>([])
  const fetchGenres = async (): Promise<Result<string[], Error>> => {
    const result = await getGenres()

    if (result.isOk()) {
      genres.value = result.value
    }
    return result
  }
  return { genres, fetchGenres }
})
