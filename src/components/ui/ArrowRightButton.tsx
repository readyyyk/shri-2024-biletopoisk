import { type FC } from 'react';

import Button, { type Props } from '@/components/ui/button.tsx';

import ArrowRightIcon from '@/icons/ArrowRightIcon.tsx';

const ArrowRightButton: FC<Omit<Props, 'variant' | 'children'>> = (props) => {
    return (
        <Button
            {...props}
            className="rounded-full aspect-square hover:shadow-[0px_0px_4px_0px_#0000004D] hover:bg-[#E9EAED] hover:border-[#E9EAED] group"
        >
            <ArrowRightIcon className="transition group-hover:text-[#ABABAB]" />
        </Button>
    );
};

export default ArrowRightButton;
