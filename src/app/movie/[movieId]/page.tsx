'use client';

import { type FC } from 'react';

import { skipToken } from '@reduxjs/toolkit/query';
import { redirect } from 'next/navigation';

import {
    Carousel,
    CarouselItem,
    CarouselNext,
    CarouselPrev,
} from '@/components/ui/carousel';

import ActorPreview from '@/components/ActorPreview.tsx';
import FilmCard from '@/components/FilmCard.tsx';
import LoaderIcon from '@/components/icons/LoaderIcon.tsx';
import { useGetFullMovieQuery } from '@/slices/backend.ts';

type Props = {
    params: { movieId: string };
};
const Page: FC<Props> = (props) => {
    const { movieId: _movieId } = props.params;

    const movieId = parseInt(_movieId ?? '');

    const { data } = useGetFullMovieQuery(
        movieId ? { id: movieId } : skipToken,
    );

    if (!data) {
        return (
            <div className="flex flex-1 justify-center items-center">
                <LoaderIcon className="animate-spin" />
            </div>
        );
    }
    if (!data.success) {
        return (
            <div className="flex flex-col gap-2">
                <span> Упс... Ошибка! </span>
                <pre> {JSON.stringify(data.error, null, 4)}</pre>
            </div>
        );
    }

    if (!movieId) {
        redirect('error/404');
    }

    return (
        <div className="w-full mb-10">
            <FilmCard {...data.data} />

            <h2 className="text-2xl font-semibold mt-5">Актеры</h2>

            <Carousel
                className="mt-5"
                navigation={
                    <div className="absolute inset-0">
                        <CarouselPrev className="absolute left-1 top-1/2 -translate-y-1/2 z-30" />
                        <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 z-30" />
                    </div>
                }
            >
                {data.data.actors.map((actor, idx) => (
                    <CarouselItem key={'actor-' + actor.name + idx}>
                        <ActorPreview {...actor} />
                    </CarouselItem>
                ))}
            </Carousel>
        </div>
    );
};

export default Page;
