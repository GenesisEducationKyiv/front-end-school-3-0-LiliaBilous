import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Result } from 'neverthrow'
import {
  getTracks,
  createTrack,
  deleteTrack,
  bulkDeleteTracks,
  updateTrack,
} from '@/shared/services/api.ts'

import type { Track } from '@/features/tracks/schema/trackSchema.ts'
import { useTrackFilterStore } from '@/features/filters/store/trackFilterStore'

export const useTrackStore = defineStore('trackStore', () => {
  // state
  const tracks = ref<Track[]>([])
  const totalPages = ref()
  const isLoading = ref(false)

  const filterStore = useTrackFilterStore()

  // actions
  const fetchTracks = async (): Promise<void> => {
    isLoading.value = true
    const query = filterStore.toQuery()

    const result = await getTracks(query)

    if (result.isOk()) {
      tracks.value = result.value.data
      totalPages.value = result.value.meta.totalPages
    }
    isLoading.value = false
  }

  const addTrack = async (newTrack: Omit<Track, 'id'>): Promise<Result<Track, Error>> => {
    const result = await createTrack(newTrack)

    if (result.isOk()) {
      tracks.value.unshift(result.value)
    }

    return result
  }
  const editTrack = async (updatedTrack: Track): Promise<Result<Track, Error>> => {
    const result = await updateTrack(updatedTrack.id, updatedTrack)
    if (result.isOk()) {
      const index = tracks.value.findIndex((t) => t.id === updatedTrack.id)
      if (index !== -1) tracks.value[index] = result.value
    }
    return result
  }

  const removeTrack = async (id: string): Promise<Result<null, Error>> => {
    const result = await deleteTrack(id)
    if (result.isOk()) {
      tracks.value = tracks.value.filter((t) => t.id !== id)
    }
    return result
  }
  const removeTracks = async (ids: string[]): Promise<Result<null, Error>> => {
    const result = await bulkDeleteTracks(ids)
    if (result.isOk()) {
      tracks.value = tracks.value.filter((t) => !ids.includes(t.id))
    }
    return result
  }

  return {
    // state
    tracks,
    totalPages,
    isLoading,

    // actions
    fetchTracks,
    addTrack,
    removeTrack,
    removeTracks,
    editTrack,
  }
})
