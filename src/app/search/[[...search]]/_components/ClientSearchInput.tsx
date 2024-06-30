'use client';

import { type FC } from 'react';

import Input from '@/components/ui/input.tsx';

import { useSearchContext } from '@/app/search/[[...search]]/search-context.tsx';

const ClientSearchInput: FC = () => {
    const {
        title: [title, setTitle],
    } = useSearchContext();
    console.log('input');
    return (
        <Input
            search
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            containerClassName="w-[400px] border-white"
            placeholder="Название фильма"
            crossIconProps={{
                onClick: () => setTitle(''),
                className:
                    'cursor-pointer transition duration-200' +
                    (title ? 'opacity-100' : ' opacity-0'),
            }}
        />
    );
};

export default ClientSearchInput;
