'use client';

import { type FC, type MouseEvent } from 'react';

import ArrowRightButton, {
    type Props as ArrowRightButtonProps,
} from '@/components/ui/ArrowRightButton.tsx';

import { cn } from '@/utils/cn.ts';

import { useCarouselContext } from './carousel-context.tsx';

type Props = ArrowRightButtonProps;
const CarouselNext: FC<Props> = (props) => {
    const { refs } = useCarouselContext();
    const handler = (e: MouseEvent<HTMLButtonElement>) => {
        props.onClick?.(e);

        refs.at(-1)?.current?.scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
        });
        // let toScroll = refs[2];
        // for (const candidate of refs) {
        //     if (
        //         !candidate.current ||
        //         !containerRef.current ||
        //         candidate.current?.offsetLeft >
        //             containerRef.current?.offsetWidth
        //     ) {
        //         break;
        //     }
        //     toScroll = candidate;
        // }
        // console.log(toScroll);
        // toScroll.current?.scrollIntoView({
        //     behavior: 'smooth',
        //     inline: 'start',
        // });
    };
    return <ArrowRightButton {...props} onClick={handler} />;
};
const CarouselPrev: FC<Props> = ({ className, ...props }) => {
    const { refs } = useCarouselContext();
    const handler = (e: MouseEvent<HTMLButtonElement>) => {
        props.onClick?.(e);

        refs[0]?.current?.scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
        });
        // let toScroll = refs.at(-1);
        // for (const candidate of refs.toReversed()) {
        //     toScroll = candidate;
        //     if (
        //         !candidate.current ||
        //         !containerRef.current ||
        //         candidate.current.offsetLeft < containerRef.current.scrollLeft
        //     ) {
        //         break;
        //     }
        // }
        // console.log(toScroll);
        // toScroll?.current?.scrollIntoView({
        //     behavior: 'smooth',
        //     inline: 'start',
        // });
    };
    return (
        <ArrowRightButton
            {...props}
            onClick={handler}
            className={cn('-rotate-180', className)}
        />
    );
};

export { CarouselNext, CarouselPrev };
