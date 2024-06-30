'use client';

import { type FC } from 'react';

import Button from '@/components/ui/button.tsx';

import UserIcon from '@/components/icons/UserIcon.tsx';
import { setOpen } from '@/slices/login-modal.ts';
import { setToken } from '@/slices/user.ts';
import { useAppDispatch, useAppSelector } from '@/store.ts';

const UserPart: FC = () => {
    const user = useAppSelector((state) => state.userSlice.logged);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(setToken(''));
        dispatch(setOpen(true));
    };

    return (
        <div className="flex gap-4 items-center">
            {!user ? (
                <Button
                    variant="filled"
                    onClick={() => {
                        dispatch(setOpen(true));
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
