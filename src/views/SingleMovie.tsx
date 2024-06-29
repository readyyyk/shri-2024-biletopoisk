import { type FC } from 'react';

import { skipToken } from '@reduxjs/toolkit/query';
import { redirect, useParams } from 'react-router-dom';

import {
    Carousel,
    CarouselItem,
    CarouselNext,
    CarouselPrev,
} from '@/components/ui/carousel';

import { useGetFullMovieQuery } from '@/api/backend.ts';
import ActorPreview from '@/components/ActorPreview.tsx';
import FilmCard from '@/components/FilmCard.tsx';

const SingleMovie: FC = () => {
    const { movieId: _movieId } = useParams();

    const movieId = parseInt(_movieId ?? '');

    const { data } = useGetFullMovieQuery(
        movieId ? { id: movieId } : skipToken,
    );

    if (!data) {
        return 'loading...';
    }
    if (!data.success) {
        return 'error';
    }

    if (!movieId) {
        redirect('error/404');
        return;
    }

    return (
        <div className="w-full mb-10">
            <FilmCard {...data.data} />

            <h2 className="text-2xl font-semibold mt-5">Актеры</h2>

            <Carousel className="mt-5">
                <CarouselPrev className="absolute left-1 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2" />

                {data.data.actors.map((actor) => (
                    <CarouselItem key={'actor-' + actor.name}>
                        <ActorPreview {...actor} />
                    </CarouselItem>
                ))}
            </Carousel>
        </div>
    );
};

export default SingleMovie;
