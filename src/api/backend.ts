// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SearchResultsSchema } from '@/schemas/api.ts';
import { GENRES, type GENRES_RU } from '@/schemas/film.ts';

// Define a service using a base URL and expected endpoints
export const backendApi = createApi({
    reducerPath: 'biletopoiskAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v1/' }),
    tagTypes: ['Movie'],
    endpoints: (builder) => ({
        getPage: builder.query<
            ReturnType<typeof SearchResultsSchema.safeParse>,
            { page?: number; genre?: GENRES_RU; year?: string }
        >({
            query: (params) => {
                // Convert genre to English and ignore ts error
                params.genre &&
                    (params.genre = GENRES[params.genre] as GENRES_RU);
                const search = new URLSearchParams(
                    JSON.parse(JSON.stringify(params)),
                );
                return 'search?' + search.toString();
            },
            providesTags: ['Movie'],
            transformResponse: (response: unknown) => {
                console.log(SearchResultsSchema.safeParse(response));
                // for (let i = 0; i < 10; i++) {
                //     Array(1e9).reduce((acc, _, i) => acc + i, 0);
                // }
                return SearchResultsSchema.safeParse(response);
            },
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPageQuery } = backendApi;
