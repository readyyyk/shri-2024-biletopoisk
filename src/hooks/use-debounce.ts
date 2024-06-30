import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay: number): [T, boolean] => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const [isDebouncing, setIsDebouncing] = useState(false);

    useEffect(() => {
        setIsDebouncing(true);
        const timeout = setTimeout(() => {
            setIsDebouncing(false);
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    }, [value, delay]);

    return [debouncedValue, isDebouncing];
};

export default useDebounce;
