import * as db from '../../utils/db';
import { Track } from '../../types';

export const trackResolvers = {
    Query: {
        tracks: async (_: unknown, args: { filter?: any }) => {
            const filter = args.filter || {};
            const { tracks, total } = await db.getTracks(filter);

            return {
                data: tracks,
                meta: {
                    total,
                    page: filter.page || 1,
                    limit: filter.limit || 10,
                    totalPages: Math.ceil(total / (filter.limit || 10)),
                },
            };
        },
        track: async (_: unknown, args: { id: string }) => {
            return db.getTrackById(args.id);
        },
    },
    Mutation: {
        createTrack: async (_: unknown, args: { input: Omit<Track, 'id' | 'createdAt' | 'updatedAt'> }) => {
            return db.createTrack(args.input);
        },
        updateTrack: async (_: unknown, args: { id: string; input: Partial<Track> }) => {
            return db.updateTrack(args.id, args.input);
        },
        deleteTrack: async (_: unknown, args: { id: string }) => {
            return db.deleteTrack(args.id);
        },
        deleteTracks: async (_: unknown, args: { ids: string[] }) => {
            return db.deleteMultipleTracks(args.ids);
        },
    },
};
