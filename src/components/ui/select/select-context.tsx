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

export type ValueType = [serverValue: string, userValue: ReactNode];
type ContextType = {
    value: ValueType;
    setValue: Dispatch<SetStateAction<ValueType>>;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Context = createContext<ContextType>({} as ContextType);

export const useSelectContext = () => useContext(Context);

type Props = {
    children: ReactNode;
    defaultValue?: ValueType;
    onOpenChange?: (isOpen: boolean) => void;
    onValueChange?: (value: string) => void;
};
export const SelectContextProvider: FC<Props> = (props) => {
    const [value, setValue] = useState<ValueType>(
        props.defaultValue ?? ['', ''],
    );
    const [isOpen, setIsOpen] = useState(false);

    const contextValue = {
        value,
        setValue,
        isOpen,
        setIsOpen,
    };

    const { onValueChange } = props;
    useEffect(() => {
        onValueChange?.(value[0]);
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
