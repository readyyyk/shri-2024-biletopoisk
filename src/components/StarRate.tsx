import { type FC } from 'react';

import StarIcon from '@/components/icons/StarIcon.tsx';
import { cn } from '@/utils/cn.ts';

type Props = {
    rating: number;
    passive?: boolean;
    onClick?: (rating: number) => void;
};

const StarRate: FC<Props> = (props) => {
    const roundedRating = Math.floor(props.rating);

    return (
        <div className="flex flex-row-reverse group">
            {[1, 2, 3, 4, 5].reverse().map((rating) => (
                <div
                    key={'rating-star-' + rating}
                    className={
                        'flex flex-col px-1 items-center ' +
                        (!props.passive && 'star-rating')
                    }
                    onClick={() => !props.passive && props.onClick?.(rating)}
                >
                    <StarIcon
                        className={cn(
                            'w-4 h-4 fill-transparent',
                            roundedRating >= rating &&
                                'text-primary fill-current',
                            !props.passive &&
                                'group-hover:fill-none group-hover:text-[#ABABAB]',
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

export default StarRate;
