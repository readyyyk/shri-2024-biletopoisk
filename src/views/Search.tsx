import { type FC, type ReactNode, useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import Input from '@/components/ui/input.tsx';

import FilmPreview from '@/components/FIlmPreview.tsx';
import FiltersSection from '@/components/SearchFiltersSection.tsx';
import SearchPagination from '@/components/SearchPagination.tsx';
import LoaderIcon from '@/components/icons/LoaderIcon.tsx';
import useDebounce from '@/hooks/use-debounce.ts';
import { GENRES_ENtoRU } from '@/schemas/film.ts';
import { useGetPageQuery } from '@/slices/backend.ts';

const NotFound = () => (
    <div className="text-center max-w-96">
        <p className="text-lg text-[#1B1F23]"> Фильмы не найдены</p>
        <p className="text-[#999FA6]">Измените запрос и попробуйте снова</p>
    </div>
);

const SearchError = ({ error }: { error: string }) => (
    <div className="flex flex-col gap-2">
        <span> Упс... Ошибка! </span>
        <pre> {error} </pre>
    </div>
);

const SearchView: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [params, setParams] = useState({
        title: searchParams.get('title') || '',
        genre: searchParams.get('genre') || '',
        year: searchParams.get('year') || '',
    });
    const [page, setPage] = useState(parseInt(searchParams.get('page') ?? '1'));
    const [debouncedParams] = useDebounce(params, 500);

    useEffect(() => {
        setSearchParams((prev) => {
            prev.set('page', page.toString());
            return prev;
        });
    }, [page, setSearchParams]);
    useEffect(() => {
        setSearchParams((prev) => {
            for (const key of ['title', 'year', 'genre'] as const) {
                const currentInSearch = searchParams.get(key) ?? '';
                if (debouncedParams[key] !== currentInSearch) {
                    setTimeout(() => setPage(1), 0);
                }
                if (debouncedParams[key]) {
                    prev.set(key, debouncedParams[key]);
                } else {
                    prev.delete(key);
                }
            }
            return prev;
        });
    }, [debouncedParams, searchParams, setSearchParams]);

    const {
        data: films,
        isLoading,
        isFetching,
    } = useGetPageQuery({ ...debouncedParams, page });

    // helpers
    const nextPage = () => setPage((p) => p + 1);
    const prevPage = () => setPage((p) => p - 1);

    const title = params.title ?? '';

    const setTitle = (title: string) => setParams((p) => ({ ...p, title }));
    const setYear = (year: string) => setParams((p) => ({ ...p, year }));
    const setGenre = (genre: string) => setParams((p) => ({ ...p, genre }));

    // const setYear = (year: string) => {};
    // const setGenre = (genre: string) => console.log;

    const genreDefaultValue: [string, string] = [
        params.genre,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        GENRES_ENtoRU[params.genre],
    ];

    let mainContent: ReactNode;
    if (isLoading || isFetching) {
        mainContent = <LoaderIcon className="animate-spin" />;
    } else if (!films || !films.success || !films.data) {
        const err = JSON.stringify(films?.error, null, 4);
        mainContent = <SearchError error={err} />;
    } else if (!films.data.search_result.length) {
        mainContent = <NotFound />;
    } else {
        const previews = films.data.search_result.map((film) => (
            <FilmPreview {...film} key={'film' + film.id} />
        ));
        mainContent = (
            <>
                {previews}
                <SearchPagination
                    page={page}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    isFirst={page === 1}
                    isLast={films.data.total_pages === page}
                />
            </>
        );
    }

    return (
        <div className="flex flex-col md:flex-row justify-start items-start gap-5 flex-1">
            <div className="flex flex-col items-center md:items-start gap-4 w-full h-full">
                <FiltersSection
                    setYear={setYear}
                    yearDefaultValue={[params.year, params.year]}
                    setGenre={setGenre}
                    genreDefaultValue={genreDefaultValue}
                />
                <Input
                    search
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    containerClassName="w-[400px] border-white"
                    placeholder="Название фильма"
                    crossIconProps={{
                        onClick: () => setTitle(''),
                        className:
                            'cursor-pointer transition duration-200' +
                            (title ? 'opacity-100' : ' opacity-0'),
                    }}
                />
                <main className="w-full flex justify-center items-center flex-col gap-4 flex-1">
                    {mainContent}
                </main>
            </div>
        </div>
    );
};

export default SearchView;
