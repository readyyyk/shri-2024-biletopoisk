import { type FC } from 'react';

import Button, { type Props as ButtonProps } from '@/components/ui/button.tsx';

import ArrowRightIcon from '@/icons/ArrowRightIcon.tsx';
import { cn } from '@/utils/cn.ts';

export type Props = Omit<ButtonProps, 'variant' | 'children'>;
const ArrowRightButton: FC<Props> = ({ className, ...props }) => {
    return (
        <Button
            {...props}
            className={cn(
                'rounded-full aspect-square hover:shadow-[0px_0px_4px_0px_#0000004D] hover:bg-[#E9EAED] disabled:bg-[#E9EAED] hover:border-[#E9EAED] disabled:border-[#E9EAED] group disabled:cursor-not-allowed disabled:shadow-none',
                className,
            )}
        >
            <ArrowRightIcon className="transition group-hover:text-[#ABABAB] group-disabled:text-[#ABABAB]" />
        </Button>
    );
};

export default ArrowRightButton;
