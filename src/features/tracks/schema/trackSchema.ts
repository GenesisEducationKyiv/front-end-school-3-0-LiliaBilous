import { z } from 'zod'

// main track schema
export const TrackSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  artist: z.string().min(1),
  album: z.string(),
  genres: z.array(z.string()),
  slug: z.string(),
  coverImage: z.string().url(),
  audioFile: z.string().url().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type Track = z.infer<typeof TrackSchema>

// query schema
export const TrackQuerySchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
  search: z.string().optional(),
  genre: z.string().optional(),
  artist: z.string().optional(),
})
export type TrackQuery = z.infer<typeof TrackQuerySchema>

// pagination scheme
export const PaginatedTracksSchema = z.object({
  data: z.array(TrackSchema),
  meta: z.object({
    totalPages: z.number(),
    currentPage: z.number(),
    totalCount: z.number(),
  }),
})
export type PaginatedTracks = z.infer<typeof PaginatedTracksSchema>
