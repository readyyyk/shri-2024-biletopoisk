'use client';

import {
    type Dispatch,
    type FC,
    type ReactNode,
    type SetStateAction,
    createContext,
    useContext,
    useState,
} from 'react';

type ContextType = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Context = createContext<ContextType>({} as ContextType);

export const useLoginContext = () => useContext(Context);

type Props = {
    children: ReactNode;
};
export const LoginContextProvider: FC<Props> = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const contextValue = {
        isOpen,
        setIsOpen,
    } satisfies ContextType;

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};
