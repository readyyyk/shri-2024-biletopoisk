'use client';

import { type FC } from 'react';

import Button from '@/components/ui/button.tsx';

import UserIcon from '@/components/icons/UserIcon.tsx';

const UserPart: FC = () => {
    const user = false;
    const handleLogout = () => console.log('handleLogout');

    return (
        <div className="flex gap-4 items-center">
            {!user ? (
                <Button
                    variant="filled"
                    onClick={() => {
                        console.log('open modal');
                    }}
                >
                    Войти
                </Button>
            ) : (
                <>
                    <div className="bg-white rounded-full p-2">
                        <UserIcon className="w-6 h-6" />
                    </div>
                    <Button variant="outlined" onClick={handleLogout}>
                        Выйти
                    </Button>
                </>
            )}
        </div>
    );
};

export default UserPart;
