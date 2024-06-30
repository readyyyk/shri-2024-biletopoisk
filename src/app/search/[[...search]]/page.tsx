import { type FC } from 'react';

import { getSearchPage } from '@/api/posts.ts';

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
    const films = await getSearchPage({
        title: searchParams['title'],
        page: parseInt(searchParams['page']) ?? 1,
        year: searchParams['year'],
        genre: searchParams['genre'],
    });

    if (!films.success) {
        console.log(films.error.message, films.error);
        return <SearchError error={films.error.message} />;
    }

    if (Math.random() > 0.5) {
        return <NotFound />;
    }

    return <pre>{JSON.stringify(films.data, null, 4)}</pre>;
};

export default SearchView;
