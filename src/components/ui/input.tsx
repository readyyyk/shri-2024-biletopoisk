import { FC, InputHTMLAttributes, useRef } from 'react';

import CrossIcon from '@/icons/CrossIcon.tsx';
import type { IconProps } from '@/icons/IconProps.ts';
import SearchIcon from '@/icons/SearchIcon.tsx';
import { cn } from '@/utils/cn.ts';

export type Props = InputHTMLAttributes<HTMLInputElement> & {
    crossIconProps?: IconProps;
    search?: boolean;
    containerClassName?: string;
};
const Input: FC<Props> = ({
    search,
    children,
    className,
    containerClassName,
    crossIconProps,
    ...rest
}) => {
    const ref = useRef<HTMLInputElement>(null);
    const { className: crossClassName, ...crossRest } = crossIconProps || {};
    return (
        <div
            className={cn(
                'has-[input:focus]:border-primary bg-white inline-flex rounded-lg p-3 items-center justify-center border border-white transition duration-150 ease-in-out hover:border-b-light gap-2',
                containerClassName,
            )}
            onClick={() => {
                ref.current?.focus();
            }}
        >
            {search && <SearchIcon className="w-6 h-6" />}
            <input
                {...rest}
                className={cn('w-full focus-visible:outline-none', className)}
                ref={ref}
            >
                {children}
            </input>
            <CrossIcon
                {...crossRest}
                className={cn('w-6 h-6', crossClassName)}
            />
        </div>
    );
};
export default Input;
