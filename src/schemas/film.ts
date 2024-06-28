import { z } from 'zod';

export const GENRES = Object.freeze({
    комедия: 'comedy',
    драма: 'drama',
    боевик: 'action',
    триллер: 'thriller',
    ужасы: 'horror',
    семейный: 'family',
    анимированный: 'cartoon',
    фэнтези: 'fantasy',
    романтика: 'romance',
    приключения: 'adventure',
    мьюзикл: 'musical',
    военный: 'war',
});
export type GENRES_RU = keyof typeof GENRES;
export type GENRES_ENG = (typeof GENRES)[GENRES_RU];

export const ActorSchema = z.object({
    name: z.string(),
    photo: z.string(), // base64 img
});
export type Actor = z.infer<typeof ActorSchema>;

export const FullMovieInfoSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    release_year: z.number(),
    poster: z.string(), //base64 img
    genre: z.enum(Object.keys(GENRES) as [string, ...string[]]),
    rating: z.string(), //float
    total_rates_count: z.string(), //int
    actors: z.array(ActorSchema),
});
export type FullMovieInfo = z.infer<typeof FullMovieInfoSchema>;

export const ShortMovieInfoSchema = FullMovieInfoSchema.omit({
    actors: true,
    total_rates_count: true,
});
export type ShortMovieInfo = z.infer<typeof ShortMovieInfoSchema>;
