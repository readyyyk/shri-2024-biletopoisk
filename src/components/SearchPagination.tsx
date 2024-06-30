import { type FC } from 'react';

import ArrowRightButton from '@/components/ui/ArrowRightButton.tsx';

type Props = {
    page: number;
    isLast: boolean;
    isFirst: boolean;
    prevPage: () => void;
    nextPage: () => void;
};
const SearchPagination: FC<Props> = (props) => {
    return (
        <div className="flex gap-4 flex-1 justify-self-start self-start items-center">
            <ArrowRightButton
                className="rotate-180 scale-75"
                onClick={props.prevPage}
                disabled={props.isFirst}
            />
            <span className="font-semibold">{props.page}</span>
            <ArrowRightButton
                className="scale-75"
                disabled={props.isLast}
                onClick={props.nextPage}
            />
        </div>
    );
};

export default SearchPagination;
