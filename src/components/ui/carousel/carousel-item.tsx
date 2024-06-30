'use client';

import { type FC, type HTMLAttributes, useEffect, useRef } from 'react';

import { useCarouselContext } from '@/components/ui/carousel/carousel-context.tsx';

import { cn } from '@/utils/cn.ts';

type Props = HTMLAttributes<HTMLDivElement>;
export const CarouselItem: FC<Props> = ({ className, ...props }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { setRefs } = useCarouselContext();

    useEffect(() => {
        setRefs((refs) => [...refs, ref]);
    }, [ref, setRefs]);

    return (
        <div {...props} className={cn(className, 'snap-start')} ref={ref}>
            {props.children}
        </div>
    );
};

export default CarouselItem;
