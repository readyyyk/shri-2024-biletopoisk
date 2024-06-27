import type { FC, InputHTMLAttributes } from 'react';

import CrossIcon from '@/icons/CrossIcon.tsx';
import type { IconProps } from '@/icons/IconProps.ts';
import SearchIcon from '@/icons/SearchIcon.tsx';
import { cn } from '@/utils/cn.ts';

export type Props = InputHTMLAttributes<HTMLInputElement> & {
    crossIconProps?: IconProps;
    search?: boolean;
};
const Input: FC<Props> = ({
    search,
    children,
    className,
    crossIconProps,
    ...rest
}) => {
    return (
        <div className="has-[input:focus]:border-primary bg-white inline-flex rounded-lg p-3 items-center justify-center border border-white transition duration-150 ease-in-out hover:border-b-light gap-2">
            {search && <SearchIcon />}
            <input {...rest} className={cn('', className ?? 'outline-none')}>
                {children}
            </input>
            <CrossIcon {...crossIconProps}> </CrossIcon>
        </div>
    );
};
export default Input;
