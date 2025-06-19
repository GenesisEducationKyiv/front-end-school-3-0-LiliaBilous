// unit test
import { describe, it, expect } from 'vitest'
import { TrackSchema } from '../trackSchema'

// валідні базові дані
const validTrack = {
  id: '1741096482742',
  title: 'Johnny B. Goode',
  artist: 'Lady Gaga',
  genres: ['Pop', 'R&B', 'Rock'],
  slug: 'johnny-b-goode',
  coverImage: 'https://picsum.photos/seed/Johnny%20B.%20Goode/300/300',
  audioFile: '1741096482742.mp3',
  createdAt: '2025-03-04T13:54:42.742Z',
  updatedAt: '2025-05-28T07:37:33.260Z',
}

describe('TrackSchema', () => {
  it('passes validation with valid data', () => {
    const result = TrackSchema.safeParse(validTrack)
    expect(result.success).toBe(true)
  })

  it('fails if title is empty', () => {
    const result = TrackSchema.safeParse({ ...validTrack, title: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.format().title?._errors).toContain(
        'String must contain at least 1 character(s)'
      )
    }
  })

  it('fails if coverImage is not a valid URL', () => {
    const result = TrackSchema.safeParse({ ...validTrack, coverImage: 'not-a-url' })
    expect(result.success).toBe(false)
  })

  it('allows audioFile to be missing', () => {
    const withoutAudio = structuredClone(validTrack)
    delete withoutAudio.audioFile

    const result = TrackSchema.safeParse(withoutAudio)
    expect(result.success).toBe(true)
  })
})
