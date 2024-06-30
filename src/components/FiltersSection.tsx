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

    const yearOptions = Object.entries(YEARS);

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
            </div>
            <div className="flex flex-col gap-1">
                <span>Год выпуска</span>
                <Select
                    placeholder="Выберите год"
                    defaultValue={props.yearDefaultValue}
                    onValueChange={(value) => props.setYear(value)}
                    options={yearOptions}
                />
            </div>
        </div>
    );
};

export default FiltersSection;
