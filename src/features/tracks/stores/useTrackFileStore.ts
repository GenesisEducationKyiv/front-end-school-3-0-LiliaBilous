import { defineStore } from 'pinia'
import { Result } from 'neverthrow'
import { uploadTrackFile, deleteTrackFile } from '@/shared/services/api.ts'
import type { Track } from '@/features/tracks/schema/trackSchema.ts'
import { useTrackStore } from '@/features/tracks/stores/trackStore.ts'

export const useTrackFileStore = defineStore('trackFileStore', () => {
  const uploadFile = async (trackId: string, file: File): Promise<Result<Track, Error>> => {
    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadTrackFile(trackId, formData)
    if (result.isOk()) {
      const trackStore = useTrackStore()
      const index = trackStore.tracks.findIndex((t) => t.id === trackId)
      if (index !== -1) trackStore.tracks[index] = result.value
    }
    return result
  }

  const deleteFile = async (trackId: string): Promise<Result<Track, Error>> => {
    const result = await deleteTrackFile(trackId)
    if (result.isOk()) {
      const trackStore = useTrackStore()
      const index = trackStore.tracks.findIndex((t) => t.id === trackId)
      if (index !== -1) trackStore.tracks[index] = result.value
    }
    return result
  }

  return {
    uploadFile,
    deleteFile,
  }
})
