'use client';

import { type FC, type MouseEvent } from 'react';

import StarIcon from '@/components/icons/StarIcon.tsx';
import { cn } from '@/utils/cn.ts';

type Props = {
    rating: number;
    passive?: boolean;
    forceRate?: boolean;
    onClick?: (event: MouseEvent<HTMLDivElement>, rating: number) => void;
};

const StarRate: FC<Props> = (props) => {
    const roundedRating = Math.floor(props.rating ?? 0);

    return (
        <div className="flex flex-row-reverse group">
            {[1, 2, 3, 4, 5].reverse().map((rating) => (
                <div
                    key={'rating-star-' + rating}
                    className={
                        'flex flex-col px-1 items-center ' +
                        (!props.passive && 'star-rating')
                    }
                    onClick={(e) =>
                        !props.passive && props.onClick?.(e, rating)
                    }
                >
                    <StarIcon
                        className={cn(
                            'w-4 h-4 fill-transparent',
                            roundedRating >= rating &&
                                'text-primary fill-current',
                            props.forceRate &&
                                roundedRating >= rating &&
                                '!text-primary !fill-primary',
                        )}
                    />
                    <span
                        className={
                            (!props.passive && 'group-hover:text-black ') +
                            (roundedRating >= rating ? '' : 'text-[#ABABAB]')
                        }
                    >
                        {rating}
                    </span>
                </div>
            ))}
        </div>
    );
};

// clever star rate
const CleverStarRate: FC<{ movieId: string }> = (props) => {
    const isLogged = false;
    const userRating = 3;

    const rateMovie = async (a: unknown) => {
        console.log('rateMovie', a);
        return { success: true };
    };
    const saveLocalRate = (a: unknown) => console.log('saveLocalRate', a);

    const handler = async (e: MouseEvent<HTMLDivElement>, rating: number) => {
        e.preventDefault();
        e.stopPropagation();
        const data = await rateMovie({
            movieId: props.movieId,
            user_rate: rating,
        });

        if (data.success) {
            saveLocalRate({ id: props.movieId, value: rating });
        }
    };

    if (!isLogged) {
        return null;
    }
    return (
        <div>
            <StarRate
                forceRate
                passive={false}
                rating={userRating}
                onClick={handler}
            />
        </div>
    );
};

export { CleverStarRate };
// export default StarRate;
