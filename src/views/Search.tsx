import { type FC, type ReactNode, useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import ArrowRightButton from '@/components/ui/ArrowRightButton.tsx';
import Input from '@/components/ui/input.tsx';
import { Option, Select } from '@/components/ui/select';

import FilmPreview from '@/components/FIlmPreview.tsx';
import LoaderIcon from '@/components/icons/LoaderIcon.tsx';
import {
    type GENRES_ENG,
    GENRES_ENtoRU,
    GENRES_RUtoEN,
    YEARS,
} from '@/schemas/film.ts';
import { useGetPageQuery } from '@/slices/backend.ts';

const SearchView: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());
    const [page, setPage] = useState(parseInt(params.page ?? ''));
    const [title, setTitle] = useState(params.title ?? '');
    const [genre, setGenre] = useState<GENRES_ENG | ''>(
        (params.genre as GENRES_ENG) ?? '',
    );
    const [year, setYear] = useState(searchParams.get('year') ?? '');

    useEffect(() => {
        const oldSearchParams = Object.fromEntries(searchParams.entries());
        const newSearchParams = { title, genre, year } as Record<
            string,
            string
        >;

        const search = new URLSearchParams(oldSearchParams);

        for (const key of Object.keys(newSearchParams)) {
            search.set(key, newSearchParams[key]);
            if (!newSearchParams[key]) {
                search.delete(key);
            }
            if (!!newSearchParams[key] !== !!oldSearchParams[key]) {
                setPage(1);
            }
        }
        setSearchParams(search);
    }, [searchParams, setSearchParams, title, genre, year]);

    useEffect(() => {
        if (!page) {
            return;
        }

        setSearchParams((prev) => {
            prev.set('page', page.toString());
            return prev;
        });
    }, [setSearchParams, page]);

    const { data: films, isLoading, isFetching } = useGetPageQuery(params);

    let mainContent: ReactNode;
    if (isLoading || isFetching) {
        mainContent = <LoaderIcon className="animate-spin" />;
    } else if (!films || !films.success || !films.data) {
        mainContent = (
            <div className="flex flex-col gap-2">
                <span> Упс... Ошибка! </span>
                <pre> {JSON.stringify(films?.error, null, 4)}</pre>
            </div>
        );
    } else if (!films.data.search_result.length) {
        mainContent = (
            <div className="text-center max-w-96">
                <p className="text-lg text-[#1B1F23]"> Фильмы не найдены</p>
                <p className="text-[#999FA6]">
                    Измените запрос и попробуйте снова
                </p>
            </div>
        );
    } else {
        mainContent = (
            <>
                {films.data.search_result.map((film) => (
                    <FilmPreview {...film} key={'film' + film.id} />
                ))}
                <div className="flex gap-4 flex-1 justify-self-start self-start items-center">
                    <ArrowRightButton
                        className="rotate-180 scale-75"
                        onClick={() => setPage((a) => a - 1)}
                        disabled={!params.page || params.page === '1'}
                    />
                    <span className="font-semibold">{params.page ?? 1}</span>
                    <ArrowRightButton
                        className="scale-75"
                        disabled={films.data.total_pages === page}
                        onClick={() => setPage((a) => a + 1)}
                    />
                </div>
            </>
        );
    }

    const genreOptions = [
        <Option key={'option-genre-all'} value="">
            Не выран
        </Option>,
        ...Object.entries(GENRES_RUtoEN).map(([ru, en]) => (
            <Option key={'option-genre-' + en} value={en}>
                <span className="first-letter:capitalize">{ru}</span>
            </Option>
        )),
    ];

    const yearOptions = [
        <Option key={'option-genre-all'} value="">
            Не выран
        </Option>,
        ...Object.entries(YEARS).map(([server, user]) => (
            <Option key={'option-year-' + server} value={server}>
                {user}
            </Option>
        )),
    ];

    return (
        <div className="flex flex-col md:flex-row justify-start items-start gap-5 flex-1">
            <div className="flex flex-col bg-white w-[400px] rounded-lg p-6 gap-5">
                <b>Фильтры</b>
                <div className="flex flex-col gap-1">
                    <span>Жанр</span>
                    <Select
                        placeholder="Выберите жанр"
                        defaultValue={
                            genre ? [genre, GENRES_ENtoRU[genre]] : undefined
                        }
                        onValueChange={(value) => setGenre(value as GENRES_ENG)}
                    >
                        {genreOptions}
                    </Select>
                </div>
                <div className="flex flex-col gap-1">
                    <span>Год выпуска</span>
                    <Select
                        placeholder="Выберите год"
                        defaultValue={
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            year ? [year, YEARS[year]] : undefined
                        }
                        onValueChange={(value) => setYear(value)}
                    >
                        {yearOptions}
                    </Select>
                </div>
            </div>

            <div className="flex flex-col items-center md:items-start gap-4 w-full h-full">
                <Input
                    search
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    containerClassName="w-[400px] border-white"
                    placeholder="Название фильма"
                    crossIconProps={{
                        onClick: () => {
                            setTitle('');
                        },
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
