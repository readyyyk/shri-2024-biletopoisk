import { type FC } from 'react';

import LoaderIcon from '@/components/icons/LoaderIcon.tsx';

const Loading: FC = () => {
    return (
        <div className="flex flex-1 justify-center items-center">
            <LoaderIcon className="animate-spin" />
        </div>
    );
};

export default Loading;
