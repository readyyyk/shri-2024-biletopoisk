import { z } from 'zod';

export const YEARS = Object.freeze({
    '2009': '2009',
    '2008': '2008',
    '2007': '2007',
    '2006': '2006',
    '1990-2005': '1990-2005',
    '1950-1989': '1950-1989',
});

export const GENRES_RUtoEN = Object.freeze({
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
export const GENRES_ENtoRU = Object.freeze({
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
export type GENRES_RU = keyof typeof GENRES_RUtoEN;
export type GENRES_ENG = (typeof GENRES_RUtoEN)[GENRES_RU];

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
    genre: z.enum(Object.keys(GENRES_RUtoEN) as [string, ...string[]]),
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
