// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RateResultSchema, SearchResultsSchema } from '@/schemas/api.ts';
import { FullMovieInfoSchema, type GENRES_ENG } from '@/schemas/film.ts';
import { SuccessLoginSchema } from '@/schemas/login.ts';
import { type RootState } from '@/store.ts';

export type GetPageOptions = {
    page?: number;
    genre?: GENRES_ENG;
    year?: string;
    title?: string;
};

// Define a service using a base URL and expected endpoints
export const backendApi = createApi({
    reducerPath: 'biletopoiskAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3030/api/v1/',
        prepareHeaders: (headers, { getState }) => {
            const user = (getState() as RootState).userSlice;
            if (user.logged) {
                headers.set('authorization', 'Bearer ' + user.token);
            }
            return headers;
        },
    }),
    tagTypes: ['Movie', 'User'],
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
            providesTags: (result) => {
                return result?.success
                    ? [{ type: 'Movie', id: result.data.id }]
                    : [];
            },
            transformResponse: (response: unknown) => {
                return FullMovieInfoSchema.safeParse(response);
            },
        }),

        postLogin: builder.mutation<
            | ReturnType<typeof SuccessLoginSchema.safeParse>
            | { success: false; error: string },
            { username: string; password: string }
        >({
            query: (body) => ({
                body: body,
                url: 'login',
                method: 'POST',
            }),
            transformResponse: (response: unknown) => {
                return SuccessLoginSchema.safeParse(response);
            },
            invalidatesTags: ['User'],
        }),

        postRateMovie: builder.mutation<
            ReturnType<typeof RateResultSchema.safeParse>,
            { movieId: string; user_rate: number }
        >({
            query: (body) => ({
                body: body,
                url: 'rateMovie',
                method: 'POST',
            }),
            transformResponse: (response: unknown) => {
                return RateResultSchema.safeParse(response);
            },
            invalidatesTags: (result) => {
                return result?.success
                    ? [{ type: 'Movie', id: result.data.movieId }]
                    : [];
            },
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetPageQuery,
    useGetFullMovieQuery,
    usePostLoginMutation,
    usePostRateMovieMutation,
} = backendApi;
