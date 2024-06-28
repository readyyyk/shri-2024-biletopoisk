import { z } from 'zod';

import { ShortMovieInfoSchema } from '@/schemas/film.ts';

export const SearchResultsSchema = z.object({
    search_result: z.array(ShortMovieInfoSchema),
    total_pages: z.number(),
});
