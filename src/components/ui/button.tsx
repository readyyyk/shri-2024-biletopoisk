import type { ButtonHTMLAttributes, FC } from 'react';

import { cn } from '@/utils/cn.ts';

const buttonVariants = Object.freeze({
    shared: 'disabled:opacity-60 inline-flex rounded-lg py-2 px-4 items-center justify-center border border-transparent transition duration-150 ease-in-out',
    variants: {
        default: 'bg-white',
        filled: 'bg-primary text-white border-primary hover:bg-primary-hover hover:border-primary-hover',
        outlined:
            'bg-transparent text-primary border-primary hover:text-primary-hover  hover:border-primary-hover',
    },
});

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof (typeof buttonVariants)['variants'];
};
const Button: FC<Props> = ({
    variant = 'default',
    children,
    className,
    ...rest
}) => {
    return (
        <button
            {...rest}
            className={cn(
                buttonVariants.shared,
                buttonVariants.variants[variant],
                className ?? '',
            )}
        >
            {children}
        </button>
    );
};
export default Button;
