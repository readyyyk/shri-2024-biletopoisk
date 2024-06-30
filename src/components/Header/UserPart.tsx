'use client';

import { type FC } from 'react';

import Button from '@/components/ui/button.tsx';

import { useUserContext } from '@/app/userContext.tsx';
import { useLoginContext } from '@/components/LoginModal/login-modal-context.tsx';
import UserIcon from '@/components/icons/UserIcon.tsx';
import { setAuthCookie } from '@/utils/cookie.ts';

const UserPart: FC = () => {
    const { setIsOpen } = useLoginContext();
    const { user, setUser } = useUserContext();
    const handleLogout = () => {
        setIsOpen(true);
        setUser({ logged: false });
        setAuthCookie('');
    };

    return (
        <div className="flex gap-4 items-center">
            {!user.logged ? (
                <Button
                    variant="filled"
                    onClick={() => {
                        setIsOpen(true);
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
