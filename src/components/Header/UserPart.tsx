import { type FC } from 'react';

import Button from '@/components/ui/button.tsx';

import UserIcon from '@/icons/UserIcon.tsx';

const UserPart: FC = () => {
    const user = null as unknown;

    return (
        <div className="flex gap-4 items-center">
            {!user ? (
                <Button
                    variant="filled"
                    onClick={() => {
                        console.log('open modal out');
                    }}
                >
                    Войти
                </Button>
            ) : (
                <>
                    <div className="bg-white rounded-full p-2">
                        <UserIcon className="w-6 h-6" />
                    </div>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            console.log('open modal');
                        }}
                    >
                        Выйти
                    </Button>
                </>
            )}
        </div>
    );
};

export default UserPart;
