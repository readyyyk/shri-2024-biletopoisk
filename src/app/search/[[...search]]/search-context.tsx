'use client';

import {
    type Dispatch,
    type FC,
    type ReactNode,
    type SetStateAction,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

import useDebounce from '@/hooks/use-debounce.ts';
import { setSearchParams } from '@/utils/search.ts';

type ContextType = {
    title: [string, (a: string) => void];
    page: [number, Dispatch<SetStateAction<number>>];
    genre: [string, (a: string) => void];
    year: [string, (a: string) => void];
};

const Context = createContext<ContextType>({} as ContextType);

export const useSearchContext = () => useContext(Context);

type Props = {
    title: string;
    page: number;
    genre: string;
    year: string;

    searchParams: Record<string, string>; //{ title: string; page: number; genre: string; year: string };

    children: ReactNode;
};
export const SearchContextProvider: FC<Props> = (props) => {
    const [params, setParams] = useState({
        title: props.title,
        genre: props.genre,
        year: props.year,
    });
    const setTitle = useCallback(
        (newTitle: string) =>
            setParams((prev) => ({ ...prev, title: newTitle })),
        [],
    );
    const setGenre = useCallback(
        (newGenre: string) =>
            setParams((prev) => ({ ...prev, genre: newGenre })),
        [],
    );
    const setYear = useCallback(
        (newYear: string) => setParams((prev) => ({ ...prev, year: newYear })),
        [],
    );

    const page = useState(props.page);

    const [debouncedParams] = useDebounce(params, 500);

    useEffect(() => {
        const currentInSearch = parseInt(props.searchParams.page);
        if (isNaN(currentInSearch) || currentInSearch === page[0]) {
            return;
        }
        setSearchParams((prev) => {
            return prev;
        });
    }, [page, props.searchParams.page]);

    useEffect(() => {
        let isChanged = false;
        for (const key of ['title', 'year', 'genre'] as const) {
            if (debouncedParams[key] !== props.searchParams[key]) {
                isChanged = true;
            }
        }
        if (!isChanged) {
            return;
        }

        setSearchParams((prev) => {
            prev.set('title', debouncedParams.title);
            prev.set('genre', debouncedParams.genre);
            prev.set('year', debouncedParams.year);
            prev.set('page', '1');
            return prev;
        });
    }, [debouncedParams, props.searchParams]);

    const contextValue = {
        page,
        title: [params.title, setTitle],
        genre: [params.genre, setGenre],
        year: [params.year, setYear],
    } satisfies ContextType;

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};
