'use client';

import { type FC, type InputHTMLAttributes, useRef } from 'react';

import CircledCrossIcon from '@/components/icons/CircledCrossIcon.tsx';
import type { IconProps } from '@/components/icons/IconProps.ts';
import SearchIcon from '@/components/icons/SearchIcon.tsx';
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
                'has-[>:disabled]:opacity-60 has-[>:disabled]:bg-neutral-200 has-[input:focus]:border-primary bg-white inline-flex rounded-lg p-3 items-center justify-center border border-b-light transition duration-150 ease-in-out hover:border-b-light gap-2',
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
            <CircledCrossIcon
                {...crossRest}
                className={cn('cursor-pointer w-6 h-6', crossClassName)}
            />
        </div>
    );
};
export default Input;
