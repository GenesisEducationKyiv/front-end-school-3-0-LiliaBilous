export type Track = {
    id: string
    title: string
    artist: string
    album?: string
    genres: string[]
    slug: string
    coverImage?: string
    audioFile?: string
    createdAt: string
    updatedAt: string
}

export type TrackQuery = {
    page?: number
    limit?: number
    sort?: string
    order?: 'asc' | 'desc'
    search?: string
    genre?: string
    artist?: string
}

export type PaginatedTracks = {
    data: Track[]
    meta: {
        totalPages: number
        currentPage: number
        totalCount: number
    }
}

export type TrackForm = {
    title: string
    artist: string
    album?: string
    coverImage?: string
    genres: string[]
}

export type ValidationErrors = {
    title: string
    artist: string
    genres: string
    coverImage: string
    audioFile?: string
}
