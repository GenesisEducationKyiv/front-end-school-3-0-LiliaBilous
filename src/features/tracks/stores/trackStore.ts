import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Result } from 'neverthrow'
import {
  getTrackBySlug,
  getTrackAudioUrl,
  getTracks,
  createTrack,
  deleteTrack,
  bulkDeleteTracks,
  updateTrack,
  uploadTrackFile,
  deleteTrackFile,
} from '@/shared/services/api.ts'

import type { Track } from '@/features/tracks/schema/trackSchema.ts'
import { useTrackFilterStore } from '@/features/filters/store/trackFilterStore'

export const useTrackStore = defineStore('trackStore', () => {
  // state
  const trackBySlug = ref<Track | null>(null)
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
  const fetchTrackBySlug = async (slug: string): Promise<Result<Track, Error>> => {
    const result = await getTrackBySlug(slug)

    if (result.isOk()) {
      const track = result.value
      const fullTrack = {
        ...track,
        ...(track.audioFile && { audioFile: getTrackAudioUrl(track.audioFile) }),
      }
      trackBySlug.value = fullTrack
    }
    return result
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

  const uploadFile = async (trackId: string, file: File): Promise<Result<Track, Error>> => {
    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadTrackFile(trackId, formData)
    if (result.isOk()) {
      const index = tracks.value.findIndex((t) => t.id === trackId)
      if (index !== -1) tracks.value[index] = result.value
    }
    return result
  }

  const deleteFile = async (trackId: string): Promise<Result<Track, Error>> => {
    const result = await deleteTrackFile(trackId)
    if (result.isOk()) {
      const index = tracks.value.findIndex((t) => t.id === trackId)
      if (index !== -1) tracks.value[index] = result.value
    }
    return result
  }

  return {
    // state
    trackBySlug,
    tracks,
    totalPages,
    isLoading,

    // actions
    fetchTracks,
    fetchTrackBySlug,
    addTrack,
    removeTrack,
    removeTracks,
    editTrack,
    uploadFile,
    deleteFile,
  }
})
