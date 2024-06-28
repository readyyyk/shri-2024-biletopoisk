import { type FC, type ReactNode, useState } from 'react';

import Input from '@/components/ui/input.tsx';
import { Option, Select } from '@/components/ui/select';

import { useGetPageQuery } from '@/api/backend.ts';
import FilmPreview from '@/components/FIlmPreview.tsx';
import LoaderIcon from '@/icons/LoaderIcon.tsx';
// import { useSearchParams } from 'react-router-dom';
import { GENRES } from '@/schemas/film.ts';

const SearchView: FC = () => {
    // const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState('');

    const { data: films, isLoading } = useGetPageQuery({});

    const mainContent: ReactNode = isLoading ? (
        <LoaderIcon className="animate-spin" />
    ) : !films || !films.success ? (
        <div className="flex flex-col gap-2">
            <span> Error </span>
            <pre> {JSON.stringify(films?.error, null, 4)}</pre>
        </div>
    ) : (
        <>
            {films.data.search_result.map((film) => (
                <FilmPreview {...film} key={'film' + film.id} />
            ))}
        </>
    );

    return (
        <div className="flex flex-col md:flex-row justify-start items-start gap-5 flex-1">
            <div className="flex flex-col bg-white w-[400px] rounded-lg p-6 gap-5">
                <b>Фильтры</b>
                <div className="flex flex-col gap-1">
                    <span>Жанр</span>
                    <Select placeholder="Выберите жанр">
                        {Object.keys(GENRES).map((genre) => (
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

            <div className="flex flex-col items-center md:items-start gap-4 w-full h-full">
                <Input
                    search
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    containerClassName="w-[400px]"
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
                <main className="w-full flex justify-center items-center flex-col gap-4 flex-1">
                    {mainContent}
                </main>
            </div>
        </div>
    );
};

export default SearchView;
