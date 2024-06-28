import { type FC, type MouseEvent, type ReactNode, useCallback } from 'react';

import Button, { type Props as ButtonProps } from '@/components/ui/button.tsx';
import { useSelectContext } from '@/components/ui/select/select-context.tsx';

import { cn } from '@/utils/cn.ts';

type Props = ButtonProps & {
    value: string;
    children?: ReactNode;
};

const Option: FC<Props> = ({
    children,
    value,
    onClick,
    className,
    ...props
}) => {
    const { setValue, setIsOpen } = useSelectContext();
    const handler = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onClick?.(e);
            setValue(value);
            setIsOpen(false);
        },
        [value, setValue, onClick],
    );
    return (
        <Button
            {...props}
            onClick={handler}
            className={cn(
                'rounded-none hover:bg-neutral-100 backdrop-blur justify-start',
                className,
            )}
        >
            {children ?? value}
        </Button>
    );
};

export default Option;
