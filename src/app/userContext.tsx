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

import { LOCALSTORAGE_AUTH_KEY } from '@/config.ts';
import { getClientCookie } from '@/utils/cookie.ts';

type X = { logged: true; token: string } | { logged: false };
type ContextType = {
    user: X;
    setUser: Dispatch<SetStateAction<X>>;
};

const Context = createContext<ContextType>({} as ContextType);

export const useUserContext = () => useContext(Context);

type Props = {
    children: ReactNode;
};
export const UserContextProvider: FC<Props> = (props) => {
    const token = getClientCookie(LOCALSTORAGE_AUTH_KEY);
    const [user, setUser] = useState<X>(
        token ? { logged: true, token } : { logged: false },
    );

    const contextValue = {
        user,
        setUser,
    } satisfies ContextType;

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};
