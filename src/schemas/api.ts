import { z } from 'zod';

import { ShortMovieInfoSchema } from '@/schemas/film.ts';

export const SearchResultsSchema = z.object({
    search_result: z.array(ShortMovieInfoSchema),
    total_pages: z.number(),
});

export const RateResultSchema = z.object({
    movieId: z.string(),
    newAverageRate: z.string(),
    newTotalRatesCount: z.number(),
});
