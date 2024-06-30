'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { BASE_API_URL, LOCALSTORAGE_AUTH_KEY } from '@/config.ts';
import { RateResultSchema, SearchResultsSchema } from '@/schemas/api.ts';
import { FullMovieInfoSchema } from '@/schemas/film.ts';

export const getTop50PostIds = async () => {
    return Array(50)
        .fill(0)
        .map((_, i) => i);
};

type GetSearchPageProps = {
    genre?: string;
    page?: number;
    year?: string;
    title?: string;
};
type GetSearchPageResponse = ReturnType<typeof SearchResultsSchema.safeParse>;
export const getSearchPage = async (
    params: GetSearchPageProps,
): Promise<GetSearchPageResponse> => {
    const search = new URLSearchParams();
    params.page && search.append('page', params.page.toString());
    params.title && search.append('title', params.title);
    params.genre && search.append('genre', params.genre);
    params.year && search.append('release_year', params.year);
    const url = BASE_API_URL + 'search?' + search.toString();
    const response = await fetch(url).then((res) => res.json());
    return SearchResultsSchema.safeParse(response);
};

type GetSingleMovieProps = { id: number };
type GetSingleMovieResponse =
    | ReturnType<typeof FullMovieInfoSchema.safeParse>
    | { success: false; error: unknown };
export const getSingleMovie = async (
    params: GetSingleMovieProps,
): Promise<GetSingleMovieResponse> => {
    const url = BASE_API_URL + 'movie/' + params.id;
    try {
        const response = await fetch(url, {
            next: { tags: ['movie' + params.id] },
        }).then((res) => res.json());
        return FullMovieInfoSchema.safeParse(response);
    } catch (e: unknown) {
        return { success: false, error: String(e) } as const;
    }
};

type RateMovieProps = {
    movieId: string;
    user_rate: number;
};
type RateMovieResponse =
    | ReturnType<typeof RateResultSchema.safeParse>
    | { success: false; error: unknown };
export const rateMovie = async (
    movieId: RateMovieProps['movieId'],
    user_rate: RateMovieProps['user_rate'],
): Promise<RateMovieResponse> => {
    const url = BASE_API_URL + 'rateMovie';
    const token = cookies().get(LOCALSTORAGE_AUTH_KEY)?.value;
    if (!token) {
        return { success: false, error: 'No token' } as const;
    }
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ movieId, user_rate }),
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((res) => res.json());

        const parsed = RateResultSchema.safeParse(response);
        if (parsed.success) {
            revalidateTag('movie' + movieId);
        }
        return parsed;
    } catch (e: unknown) {
        return { success: false, error: JSON.stringify(e) } as const;
    }
};
