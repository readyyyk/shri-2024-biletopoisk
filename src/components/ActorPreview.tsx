import { type FC } from 'react';

import Image from 'next/image';

import { type Actor } from '@/schemas/film.ts';

type Props = Actor;

const ActorPreview: FC<Props> = (props) => {
    return (
        <div className="flex flex-col gap-4 items-start w-36">
            <Image
                src={props.photo}
                alt={props.name + ' photo'}
                width={160}
                height={228.57}
                className="rounded-lg h-[228px] w-auto"
            />
            <h3 className="text-xl text-nowrap text-ellipsis max-w-full overflow-x-clip">
                {props.name}
            </h3>
        </div>
    );
};

export default ActorPreview;
