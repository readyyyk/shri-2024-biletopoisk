'use client';

import { type FC } from 'react';

import { useSearchContext } from '@/app/search/[[...search]]/search-context.tsx';
import FiltersSection from '@/components/FiltersSection.tsx';
import { GENRES_ENtoRU } from '@/schemas/film.ts';

const ClientFiltersSection: FC = () => {
    console.log('filter');
    const {
        year: [year, setYear],
        genre: [genre, setGenre],
    } = useSearchContext();

    return (
        <FiltersSection
            setYear={setYear}
            yearDefaultValue={[year, year]}
            setGenre={setGenre}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            genreDefaultValue={[genre, GENRES_ENtoRU[genre]]}
        />
    );
};

export default ClientFiltersSection;
