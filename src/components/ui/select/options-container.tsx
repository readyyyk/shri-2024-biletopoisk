import { type FC, type ReactNode, useCallback, useEffect } from 'react';

import { cn } from '@/utils/cn.ts';

type Props = {
    children?: ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const OptionsContainer: FC<Props> = ({ isOpen, setIsOpen, children }) => {
    const handler = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        // setTimeout is needed to prevent the handler from being called immediately
        setTimeout(() => window.addEventListener('click', handler), 0);
        return () => window.removeEventListener('click', handler);
    }, [isOpen, setIsOpen, handler]);

    return (
        <div
            className={cn(
                'flex flex-col transition duration-200 ease-in-out rounded-xl overflow-clip origin-top absolute top-full mt-1 w-full z-30 shadow-[0px_10px_22px_-4px_#1B1F231F]',
                isOpen
                    ? 'opacity-100 scale-y-100 scale-x-100'
                    : 'opacity-0 scale-y-0 scale-x-75',
            )}
        >
            {children}
        </div>
    );
};

export default OptionsContainer;
