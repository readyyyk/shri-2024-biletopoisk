import { type FC, type ReactNode, useEffect } from 'react';

import { useSelectContext } from '@/components/ui/select/select-context.tsx';

import { cn } from '@/utils/cn.ts';

type Props = { children?: ReactNode };

const OptionsContainer: FC<Props> = (props) => {
    const { isOpen, setIsOpen } = useSelectContext();

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handler = () => setIsOpen(false);
        window.addEventListener('click', handler);
        return () => window.removeEventListener('click', handler);
    }, [isOpen, setIsOpen]);

    return (
        <div
            className={cn(
                'flex flex-col transition duration-200 ease-in-out rounded-xl overflow-clip origin-top absolute top-full mt-1 w-full',
                isOpen
                    ? 'opacity-100 scale-y-100 scale-x-100'
                    : 'opacity-0 scale-y-0 scale-x-75',
            )}
        >
            {props.children}
        </div>
    );
};

export default OptionsContainer;
