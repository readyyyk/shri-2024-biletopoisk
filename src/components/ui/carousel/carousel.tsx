'use client';

import {
    type FC,
    type HTMLAttributes,
    type ReactNode,
    useEffect,
    useRef,
} from 'react';

import {
    CarouselContextProvider,
    useCarouselContext,
} from '@/components/ui/carousel/carousel-context.tsx';

import { cn } from '@/utils/cn.ts';

const CarouselContainer: FC<HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...props
}) => {
    const { setContainerRef } = useCarouselContext();
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setContainerRef(ref);
    }, [ref, setContainerRef]);
    return (
        <div
            className={cn(
                'overflow-x-scroll w-full relative flex gap-5 snap-x scroll-invisible',
                className,
            )}
            ref={ref}
        >
            {props.children}
        </div>
    );
};

// Temporally
type Props = HTMLAttributes<HTMLDivElement> & { navigation?: ReactNode };
const Carousel: FC<Props> = ({ navigation, ...props }) => {
    return (
        <CarouselContextProvider>
            <div className="relative max-w-full">
                {navigation}
                <CarouselContainer {...props} />
            </div>
        </CarouselContextProvider>
    );
};

export default Carousel;
