'use client';

import {
    type Dispatch,
    type FC,
    type ReactNode,
    type RefObject,
    type SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

type ContextType = {
    refs: RefObject<HTMLDivElement>[];
    setRefs: Dispatch<SetStateAction<RefObject<HTMLDivElement>[]>>;
    containerRef: RefObject<HTMLDivElement>;
    setContainerRef: Dispatch<SetStateAction<RefObject<HTMLDivElement>>>;
};

const Context = createContext<ContextType>({} as ContextType);

export const useCarouselContext = () => useContext(Context);

type Props = {
    children: ReactNode;
};
export const CarouselContextProvider: FC<Props> = (props) => {
    const [refs, setRefs] = useState<RefObject<HTMLDivElement>[]>([]);
    const [containerRef, setContainerRef] = useState<RefObject<HTMLDivElement>>(
        undefined as unknown as RefObject<HTMLDivElement>,
    );

    useEffect(() => {
        setRefs((prev) =>
            prev.toSorted(
                (a, b) =>
                    (a.current?.offsetLeft ?? Infinity) -
                    (b.current?.offsetLeft ?? -Infinity),
            ),
        );
    }, [refs.length]);

    const contextValue = {
        refs,
        setRefs,
        containerRef,
        setContainerRef,
    } satisfies ContextType;

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};
