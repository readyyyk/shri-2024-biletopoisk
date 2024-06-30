import { type FC } from 'react';

import Select from '@/components/ui/select/simple.tsx';

// import { Option, Select } from '@/components/ui/select';
import { GENRES_ENtoRU, YEARS } from '@/schemas/film.ts';

type FiltersSectionProps = {
    genreDefaultValue?: [string, string];
    setGenre: (a: string) => void;
    yearDefaultValue?: [string, string];
    setYear: (a: string) => void;
};
const FiltersSection: FC<FiltersSectionProps> = (props) => {
    const genreOptions = Object.entries(GENRES_ENtoRU);
    /*[
        <Option key={'option-genre-all'} value="">
            Не выран
        </Option>,
        ...Object.entries(GENRES_RUtoEN).map(([ru, en]) => (
            <Option key={'option-genre-' + en} value={en}>
                <span className="first-letter:capitalize">{ru}</span>
            </Option>
        )),
    ];*/

    const yearOptions = Object.entries(YEARS);
    /*[
        <Option key={'option-genre-all'} value="">
            Не выран
        </Option>,
        ...Object.entries(YEARS).map(([server, user]) => (
            <Option key={'option-year-' + server} value={server}>
                {user}
            </Option>
        )),
    ];*/

    return (
        <div className="flex flex-col bg-white w-[400px] rounded-lg p-6 gap-5">
            <b>Фильтры</b>
            <div className="flex flex-col gap-1">
                <span>Жанр</span>
                <Select
                    placeholder="Выберите жанр"
                    defaultValue={props.genreDefaultValue}
                    onValueChange={(value) => props.setGenre(value)}
                    options={genreOptions}
                />
                {/*<Select*/}
                {/*    placeholder="Выберите жанр"*/}
                {/*    defaultValue={props.genreDefaultValue}*/}
                {/*    onValueChange={(value) => props.setGenre(value)}*/}
                {/*>*/}
                {/*    {genreOptions}*/}
                {/*</Select>*/}
            </div>
            <div className="flex flex-col gap-1">
                <span>Год выпуска</span>
                <Select
                    placeholder="Выберите год"
                    defaultValue={props.yearDefaultValue}
                    onValueChange={(value) => props.setYear(value)}
                    options={yearOptions}
                />
                {/*<Select*/}
                {/*    placeholder="Выберите год"*/}
                {/*    defaultValue={props.yearDefaultValue}*/}
                {/*    onValueChange={(value) => props.setYear(value)}*/}
                {/*>*/}
                {/*    {yearOptions}*/}
                {/*</Select>*/}
            </div>
        </div>
    );
};

export default FiltersSection;
