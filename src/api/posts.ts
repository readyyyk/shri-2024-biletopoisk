import { BASE_API_URL } from '@/config.ts';
import { SearchResultsSchema } from '@/schemas/api.ts';
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
        const response = await fetch(url).then((res) => res.json());
        return FullMovieInfoSchema.safeParse(response);
    } catch (e: unknown) {
        return { success: false, error: String(e) } as const;
    }
};
