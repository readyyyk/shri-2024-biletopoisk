import { type FC, type ReactNode } from 'react';

import { getSearchPage } from '@/api/posts.ts';
import ClientFiltersSection from '@/app/search/[[...search]]/_components/ClientFiltersSection.tsx';
import ClientSearchInput from '@/app/search/[[...search]]/_components/ClientSearchInput.tsx';
import ClientSearchPagination from '@/app/search/[[...search]]/_components/ClientSearchPagination.tsx';
import { SearchContextProvider } from '@/app/search/[[...search]]/search-context.tsx';
import FilmPreview from '@/components/FIlmPreview.tsx';

export async function generateStaticParams() {
    return [{ search: [''], searchParams: {} }];
}

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

type Props = { searchParams: Record<string, string> };
const SearchView: FC<Props> = async (props) => {
    const { searchParams } = props;

    const realParams = {
        title: searchParams['title'] ?? '',
        page: Number.isNaN(parseInt(searchParams['page']))
            ? 1
            : parseInt(searchParams['page']),
        year: searchParams['year'] ?? '',
        genre: searchParams['genre'] ?? '',
    };

    const films = await getSearchPage(realParams);

    let mainContent: ReactNode;
    if (!films.success) {
        const err = JSON.stringify(films.error, null, 4);
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
                <ClientSearchPagination total={films.data?.total_pages} />
            </>
        );
    }

    return (
        <div className="flex flex-col md:flex-row justify-start items-start gap-5 flex-1">
            <SearchContextProvider {...realParams} searchParams={searchParams}>
                <ClientFiltersSection />
                <div className="flex flex-col items-center md:items-start gap-4 w-full h-full">
                    <ClientSearchInput />
                    <main className="w-full flex justify-center items-center flex-col gap-4 flex-1">
                        {mainContent}
                    </main>
                </div>
            </SearchContextProvider>
        </div>
    );
};

export default SearchView;
