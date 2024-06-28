import { SearchResultsSchema } from '@/schemas/api.ts';

export async function getPage(page: number) {
    const url = new URL('http://localhost:3030/api/v1/search');
    const search = new URLSearchParams({
        page: page.toString(),
    });
    url.search = search.toString();

    return await fetch(url.toString())
        .then((res) => res.json())
        .then((data) => SearchResultsSchema.safeParse(data));
}
