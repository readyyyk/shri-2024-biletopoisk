import { type FC } from 'react';

import { Link } from 'react-router-dom';

import StarIcon from '@/icons/StarIcon.tsx';
import type { ShortMovieInfo } from '@/schemas/film.ts';
import { cn } from '@/utils/cn.ts';

type Props = ShortMovieInfo;
const FilmPreview: FC<Props> = (props) => {
    const roundedRating = Math.round(parseFloat(props.rating));
    return (
        <Link
            to={'/movie/' + props.id}
            className="flex justify-between transition bg-white hover:bg-[#F8F8F8] rounded-lg p-6 w-full"
        >
            <div className="gap-6 flex items-start">
                <img
                    src={props.poster}
                    alt={props.title + 'poster'}
                    width={'100px'}
                    height={'120px'}
                    className="rounded-lg"
                />
                <div className="flex flex-col gap-6 w-fit text-[#1B1F23]">
                    <h3 className="font-semibold text-xl">{props.title}</h3>
                    <div className="flex gap-6">
                        <div className="flex flex-col gap-3">
                            <span className="text-[#ABABAB]">Жанр</span>
                            <span className="text-[#ABABAB]">Год выпуска</span>
                            <span className="text-[#ABABAB]">Описание</span>
                        </div>
                        <div className="flex flex-col gap-3 max-w-[600px]">
                            <span className="first-letter:uppercase">
                                {props.genre}
                            </span>
                            <span>{props.release_year}</span>
                            <span>{props.description}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-2">
                <div className="flex flex-col gap-2 items-center">
                    <StarIcon
                        className={cn(
                            'w-4 h-4 fill-transparent',
                            roundedRating >= 1 && 'text-primary fill-current',
                        )}
                    />
                    <span
                        className={roundedRating >= 1 ? '' : 'text-[#ABABAB]'}
                    >
                        1
                    </span>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <StarIcon
                        className={cn(
                            'w-4 h-4 fill-transparent',
                            roundedRating >= 2 && 'text-primary fill-current',
                        )}
                    />
                    <span
                        className={roundedRating >= 2 ? '' : 'text-[#ABABAB]'}
                    >
                        2
                    </span>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <StarIcon
                        className={cn(
                            'w-4 h-4 fill-transparent',
                            roundedRating >= 3 && 'text-primary fill-current',
                        )}
                    />
                    <span
                        className={roundedRating >= 3 ? '' : 'text-[#ABABAB]'}
                    >
                        3
                    </span>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <StarIcon
                        className={cn(
                            'w-4 h-4 fill-transparent',
                            roundedRating >= 4 && 'text-primary fill-current',
                        )}
                    />
                    <span
                        className={roundedRating >= 4 ? '' : 'text-[#ABABAB]'}
                    >
                        4
                    </span>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <StarIcon
                        className={cn(
                            'w-4 h-4 fill-transparent',
                            roundedRating >= 5 && 'text-primary fill-current',
                        )}
                    />
                    <span
                        className={roundedRating >= 5 ? '' : 'text-[#ABABAB]'}
                    >
                        5
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default FilmPreview;
