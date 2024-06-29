// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SearchResultsSchema } from '@/schemas/api.ts';
import { FullMovieInfoSchema, type GENRES_ENG } from '@/schemas/film.ts';

export type GetPageOptions = {
    page?: number;
    genre?: GENRES_ENG;
    year?: string;
    title?: string;
};

// Define a service using a base URL and expected endpoints
export const backendApi = createApi({
    reducerPath: 'biletopoiskAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v1/' }),
    tagTypes: ['Movie'],
    endpoints: (builder) => ({
        getPage: builder.query<
            ReturnType<typeof SearchResultsSchema.safeParse>,
            GetPageOptions
        >({
            query: (params) => {
                const search = new URLSearchParams();
                params.page && search.append('page', params.page.toString());
                params.title && search.append('title', params.title);
                params.genre && search.append('genre', params.genre);
                params.year && search.append('release_year', params.year);
                return 'search?' + search.toString();
            },
            providesTags: ['Movie'],
            transformResponse: (response: unknown) => {
                return SearchResultsSchema.safeParse(response);
            },
        }),

        getFullMovie: builder.query<
            ReturnType<typeof FullMovieInfoSchema.safeParse>,
            { id: number }
        >({
            query: ({ id }) => 'movie/' + id,
            providesTags: ['Movie'],
            transformResponse: (response: unknown) => {
                return FullMovieInfoSchema.safeParse(response);
            },
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPageQuery, useGetFullMovieQuery } = backendApi;
