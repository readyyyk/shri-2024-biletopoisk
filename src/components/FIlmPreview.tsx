import { type FC } from 'react';

import { Link } from 'react-router-dom';

import StarRate from '@/components/StarRate.tsx';
import type { ShortMovieInfo } from '@/schemas/film.ts';

type Props = ShortMovieInfo;
const FilmPreview: FC<Props> = (props) => {
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

            <StarRate rating={parseFloat(props.rating)} passive />
        </Link>
    );
};

export default FilmPreview;
