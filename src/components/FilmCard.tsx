import { type FC } from 'react';

import StarRate from '@/components/StarRate.tsx';
import { type FullMovieInfo } from '@/schemas/film.ts';

type Props = FullMovieInfo;

const FilmCard: FC<Props> = (props) => {
    return (
        <div className="w-full flex gap-8 p-6 bg-white rounded-3xl text-xl">
            <img
                className="rounded-lg"
                src={props.poster}
                alt={props.title + ' poster'}
                width={'400px'}
                height={'500px'}
            />
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <h2 className="text-4xl font-semibold">{props.title}</h2>
                    <StarRate
                        rating={parseFloat(props.rating)}
                        onClick={(rating) => console.log(rating)}
                    />
                </div>
                <div className="flex gap-2 mt-4">
                    <b>Жанр:</b>
                    <span className="first-letter:uppercase">
                        {props.genre}
                    </span>
                </div>
                <div className="flex gap-2">
                    <b>Год выпуска:</b>
                    <span>{props.release_year}</span>
                </div>
                <div className="flex gap-2">
                    <b>Рейтинг:</b>
                    <span>{props.rating}</span>
                </div>
                <b>Описание</b>
                <p>{props.description}</p>
            </div>
        </div>
    );
};

export default FilmCard;
