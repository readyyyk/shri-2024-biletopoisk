'use client';

import {
    type Dispatch,
    type FC,
    type ReactNode,
    type SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

type ContextType = {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Context = createContext<ContextType>({} as ContextType);

export const useSelectContext = () => useContext(Context);

type Props = {
    children: ReactNode;
    defaultValue?: string;
    onOpenChange?: (isOpen: boolean) => void;
    onValueChange?: (value: string) => void;
};
export const SelectContextProvider: FC<Props> = (props) => {
    const [value, setValue] = useState(props.defaultValue ?? '');
    const [isOpen, setIsOpen] = useState(false);

    const contextValue = {
        value,
        setValue,
        isOpen,
        setIsOpen,
    };

    const { onValueChange } = props;
    useEffect(() => {
        onValueChange?.(value);
    }, [value, onValueChange]);

    const { onOpenChange } = props;
    useEffect(() => {
        onOpenChange?.(isOpen);
    }, [isOpen, onOpenChange]);

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};
