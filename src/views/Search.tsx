import { type FC, useEffect, useState } from 'react';

import Input from '@/components/ui/input.tsx';
import { Option, Select } from '@/components/ui/select';

import { getPage } from '@/api.ts';
import FilmPreview from '@/components/FIlmPreview.tsx';
// import { useSearchParams } from 'react-router-dom';
import { GENRES } from '@/schemas/film.ts';
import type { ShortMovieInfo } from '@/schemas/film.ts';

const SearchView: FC = () => {
    // const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState('');

    const [films, setFilms] = useState<ShortMovieInfo[]>([]);
    useEffect(() => {
        (async () => {
            const result = await getPage(1);
            if (!result.success) {
                return 'Error';
            }
            setFilms(result.data.search_result);
        })();
    }, []);

    return (
        <div className="flex flex-col md:flex-row justify-start items-start gap-5">
            <div className="flex flex-col bg-white w-[400px] rounded-lg p-6 gap-5">
                <b>Фильтры</b>
                <div className="flex flex-col gap-1">
                    <span>Жанр</span>
                    <Select placeholder="Выберите жанр">
                        {Object.values(GENRES).map((genre) => (
                            <Option key={genre} value={genre}>
                                <span className="first-letter:capitalize">
                                    {genre}
                                </span>
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="flex flex-col gap-1">
                    <span>Год выпуска</span>
                    <Select placeholder="Выберите год">
                        <Option value="1">1</Option>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col items-center md:items-start gap-4">
                <Input
                    search
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    containerClassName={'w-[400px]'}
                    placeholder="Название фильма"
                    crossIconProps={{
                        onClick: () => {
                            setValue('');
                        },
                        className:
                            'cursor-pointer transition duration-200' +
                            (value ? 'opacity-100' : ' opacity-0'),
                    }}
                />
                {films.map((film) => (
                    <FilmPreview {...film} key={'film' + film.id} />
                ))}
            </div>
        </div>
    );
};

export default SearchView;
