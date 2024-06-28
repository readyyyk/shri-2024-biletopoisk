import { z } from 'zod';

export const GENRES = Object.freeze({
    comedy: 'комедия',
    drama: 'драма',
    action: 'боевик',
    thriller: 'триллер',
    horror: 'ужасы',
    family: 'семейный',
    cartoon: 'анимированный',
    fantasy: 'фэнтези',
    romance: 'романтика',
    adventure: 'приключения',
    musical: 'мьюзикл',
    war: 'военный',
});

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
    genre: z.enum(Object.values(GENRES) as [string, ...string[]]),
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
