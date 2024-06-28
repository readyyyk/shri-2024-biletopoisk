import { type FC } from 'react';

import UserPart from '@/components/Header/UserPart.tsx';

const Header: FC = () => {
    return (
        <div className="top-0 sticky bg-secondary flex justify-between py-6 px-8 z-40">
            <span className="text-4xl font-bold text-white">Фильмопоиск</span>
            <UserPart />
        </div>
    );
};

export default Header;
