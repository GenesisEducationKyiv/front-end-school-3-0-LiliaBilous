import { z } from 'zod'

// main track schema
export const TrackSchema = z.object({
    id: z.string(),
    title: z.string().min(1),
    artist: z.string().min(1),
    album: z.string().optional(),
    genres: z.array(z.string()),
    slug: z.string(),
    coverImage: z.string().url().optional(),
    audioFile: z.string().url().optional(),
    createdAt: z.string(), // або z.coerce.date()
    updatedAt: z.string()
})
export type Track = z.infer<typeof TrackSchema>

// track form schema (create/edit)
export const TrackFormSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    artist: z.string().min(1, 'Artist is required'),
    album: z.string().optional(),
    coverImage: z.string().url().optional(),
    genres: z.array(z.string()).min(1, 'Select at least one genre')
})
export type TrackForm = z.infer<typeof TrackFormSchema>

// query schema
export const TrackQuerySchema = z.object({
    page: z.number().int().positive().optional(),
    limit: z.number().int().positive().optional(),
    sort: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional(),
    search: z.string().optional(),
    genre: z.string().optional(),
    artist: z.string().optional()
})
export type TrackQuery = z.infer<typeof TrackQuerySchema>

// pagination scheme
export const PaginatedTracksSchema = z.object({
    data: z.array(TrackSchema),
    meta: z.object({
        totalPages: z.number(),
        currentPage: z.number(),
        totalCount: z.number()
    })
})
export type PaginatedTracks = z.infer<typeof PaginatedTracksSchema>