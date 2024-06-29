import { type FC, type HTMLAttributes, useEffect, useRef } from 'react';

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

type Props = HTMLAttributes<HTMLDivElement>;
const Carousel: FC<Props> = (props) => {
    return (
        <CarouselContextProvider>
            <div className="max-w-full relative">
                <CarouselContainer {...props} />
            </div>
        </CarouselContextProvider>
    );
};

export default Carousel;
