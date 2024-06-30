'use client';

import { type FC } from 'react';

import { useSearchContext } from '@/app/search/[[...search]]/search-context.tsx';
import SearchPagination from '@/components/SearchPagination.tsx';

type Props = { total: number };

const ClientSearchPagination: FC<Props> = (props) => {
    const {
        page: [page, setPage],
    } = useSearchContext();
    return (
        <SearchPagination
            page={page}
            nextPage={() => setPage((a) => a + 1)}
            prevPage={() => setPage((a) => a - 1)}
            isFirst={page === 1}
            isLast={props.total === page}
        />
    );
};

export default ClientSearchPagination;
