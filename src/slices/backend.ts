// Need to use the React-specific entry point to import createApi
import {
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/config.ts';
import { RateResultSchema, SearchResultsSchema } from '@/schemas/api.ts';
import { FullMovieInfoSchema } from '@/schemas/film.ts';
import { SuccessLoginSchema } from '@/schemas/login.ts';
import { setOpen } from '@/slices/login-modal.ts';
import { setToken } from '@/slices/user.ts';
import { type RootState } from '@/store.ts';

export type GetPageOptions = {
    page?: number;
    genre?: string; //GENRES_ENG;
    year?: string;
    title?: string;
};

const baseQueryWithAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const user = (api.getState() as RootState).userSlice;

    const baseQuery = fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            if (user.logged) {
                headers.set('Authorization', `Bearer ${user.token}`);
            }
            return headers;
        },
    });

    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        api.dispatch(setToken(''));
        api.dispatch(setOpen(true));

        return result;
    }

    return result;
};

// Define a service using a base URL and expected endpoints
export const backendApi = createApi({
    reducerPath: 'biletopoiskAPI',
    baseQuery: baseQueryWithAuth,

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
