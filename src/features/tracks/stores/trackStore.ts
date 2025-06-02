import { ref } from 'vue'
import { defineStore } from 'pinia'
import { notifyInfo, notifySuccess } from '@/shared/services/toastService.ts'
import {
  getGenres,
  getTracks,
  createTrack,
  deleteTrack,
  bulkDeleteTracks,
  updateTrack,
  uploadTrackFile,
  deleteTrackFile
} from '@/shared/services/api.ts'

import type { Track, TrackQuery } from '@/features/tracks/schema/trackSchema.ts'

export const useTrackStore = defineStore('trackStore', () => {
  // state
  const availableGenres = ref<string[]>([])
  const tracks = ref<Track[]>([])
  const page = ref(1)
  const totalPages = ref(1)
  const search = ref('')
  const artist = ref('')
  const genres = ref<string[]>([])
  const sort = ref('')
  const isLoading = ref(false)

  // actions
  const fetchGenres = async (): Promise<void> => {
    const result = await getGenres()
    if (result.isErr()) {
      notifyInfo('Failed to fetch genres: ' + result.error.message)
      return
    }
    availableGenres.value = result.value

  }

  const fetchTracks = async (): Promise<void> => {
    isLoading.value = true
    try {
      const query: TrackQuery = {
        page: page.value,
        limit: 10,
        search: search.value,
        artist: artist.value,
        genre: genres.value.join(','),
        ...(sort.value ? { sort: sort.value } : {})
      }

      const result = await getTracks(query)

      if (result.isOk()) {
        tracks.value = result.value.data
        totalPages.value = result.value.meta.totalPages
      } else {
        notifyInfo('Failed to fetch tracks: ' + result.error.message)
      }
    } catch (err) {
      notifyInfo('Server is not responding. Please try again later.')
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const addTrack = async (newTrack: Omit<Track, 'id'>): Promise<void> => {
    const result = await createTrack(newTrack)
    console.log('store:', result)

    if (result.isOk()) {
      tracks.value.unshift(result.value)
      notifySuccess('New track added')
    } else {
      const errorMessage =
        result.error instanceof Error ? result.error.message : 'Unknown error'
      notifyInfo(`Failed to create track: ${errorMessage}`)
    }
  }

  const removeTrack = async (id: string): Promise<void> => {
    const result = await deleteTrack(id)
    if (result.isOk()) {
      tracks.value = tracks.value.filter(t => t.id !== id)
    } else {
      notifyInfo('Failed to delete track: ' + result.error.message)
    }
  }

  const removeTracks = async (ids: string[]): Promise<void> => {
    const result = await bulkDeleteTracks(ids)
    if (result.isOk()) {
      tracks.value = tracks.value.filter(t => !ids.includes(t.id))
    } else {
      notifyInfo('Failed to bulk delete tracks: ' + result.error.message)
    }
  }

  const editTrack = async (updatedTrack: Track): Promise<void> => {
    const result = await updateTrack(updatedTrack.id, updatedTrack)
    if (result.isOk()) {
      const index = tracks.value.findIndex(t => t.id === updatedTrack.id)
      if (index !== -1) tracks.value[index] = result.value
    } else {
      notifyInfo('Failed to update track: ' + result.error.message)
    }
  }

  const uploadFile = async (trackId: string, file: File): Promise<void> => {
    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadTrackFile(trackId, formData)
    if (result.isOk()) {
      const index = tracks.value.findIndex(t => t.id === trackId)
      if (index !== -1) tracks.value[index] = result.value
    } else {
      notifyInfo('Failed to upload file: ' + result.error.message)
    }
  }

  const deleteFile = async (trackId: string): Promise<void> => {
    const result = await deleteTrackFile(trackId)
    if (result.isOk()) {
      const index = tracks.value.findIndex(t => t.id === trackId)
      if (index !== -1) tracks.value[index] = result.value
    } else {
      notifyInfo('Failed to delete file: ' + result.error.message)
    }
  }

  return {
    // state
    availableGenres,
    tracks,
    page,
    totalPages,
    search,
    artist,
    genres,
    sort,
    isLoading,

    // actions
    fetchGenres,
    fetchTracks,
    addTrack,
    removeTrack,
    removeTracks,
    editTrack,
    uploadFile,
    deleteFile
  }
})
