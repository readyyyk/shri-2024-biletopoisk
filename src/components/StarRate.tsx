'use client';

import { type FC, type MouseEvent, useState } from 'react';

import { rateMovie } from '@/api/posts.ts';
import { useUserContext } from '@/app/userContext.tsx';
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
    const { user } = useUserContext();
    const isLogged = user.logged;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setState] = useState(0);

    if (!isLogged) {
        return null;
    }

    const userRating = parseInt(
        localStorage.getItem('film' + props.movieId) ?? '0',
    );

    const saveLocalRate = (props: { id: string; value: number }) => {
        localStorage.setItem('film' + props.id, props.value.toString());
        setState((prev) => prev + 1);
    };

    const handler = async (e: MouseEvent<HTMLDivElement>, rating: number) => {
        e.preventDefault();
        e.stopPropagation();
        console.log({
            movieId: props.movieId,
            user_rate: rating,
        });
        const data = await rateMovie(props.movieId, rating);

        if (data.success) {
            saveLocalRate({ id: props.movieId, value: rating });
        }
    };

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
