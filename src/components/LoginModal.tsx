'use client';

import { type FC, type FormEvent, useEffect, useState } from 'react';

import Button from '@/components/ui/button.tsx';
import Input from '@/components/ui/input.tsx';
import Modal from '@/components/ui/modal.tsx';

import CrossIcon from '@/components/icons/CrossIcon.tsx';
import LoaderIcon from '@/components/icons/LoaderIcon.tsx';
import { usePostLoginMutation } from '@/slices/backend.ts';
import { setOpen } from '@/slices/login-modal.ts';
import { setToken } from '@/slices/user.ts';
import { useAppDispatch, useAppSelector } from '@/store.ts';

const LoginModal: FC = () => {
    const open = useAppSelector((state) => state.loginModalSlice);
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [mutate, { data, status, error, isLoading }] = usePostLoginMutation();

    useEffect(() => {
        setErrorMsg('');
    }, [username, password]);

    useEffect(() => {
        if (data) {
            if (data.success) {
                setErrorMsg('');
                dispatch(setToken(data.data.token));
                dispatch(setOpen(false));
            } else {
                setErrorMsg(String(data.error));
            }
            return;
        }
        const realError = error as { data?: { error: string } };
        if (realError?.data?.error) {
            setErrorMsg(realError.data.error);
            return;
        }
    }, [data, status, error, dispatch]);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        mutate({ username: username, password });
    };

    return (
        <Modal isOpen={open} onClose={() => dispatch(setOpen(false))}>
            <form
                className="flex flex-col w-96 bg-white p-6 rounded-xl gap-3"
                onSubmit={submitHandler}
            >
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl">Авторизация</h2>
                    <CrossIcon
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => dispatch(setOpen(false))}
                    />
                </div>

                <div
                    className={
                        'bg-gradient-to-r from-pink-400 to-red-600 px-4 text-transparent bg-clip-text text-center font-bold transition opacity-0' +
                        (errorMsg ? ' opacity-100' : '')
                    }
                >
                    {errorMsg}
                </div>

                <label className="flex flex-col gap-1">
                    <span>
                        Логин
                        <span className="font-extrabold text-xl text-pink-500">
                            *
                        </span>
                    </span>
                    <Input
                        required
                        name="login"
                        autoComplete="username"
                        id="biletopoisk-login"
                        disabled={isLoading}
                        placeholder="Введите логин"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        crossIconProps={{
                            onClick: () => !isLoading && setUsername(''),
                            className: username ? 'opacity-100 ' : 'opacity-0',
                        }}
                    />
                </label>

                <label className="flex flex-col gap-1">
                    <span>
                        Пароль
                        <span className="font-extrabold text-xl text-pink-500">
                            *
                        </span>
                    </span>

                    <Input
                        required
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        id="biletopoisk-password"
                        disabled={isLoading}
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        crossIconProps={{
                            onClick: () => !isLoading && setPassword(''),
                            className: password ? 'opacity-100 ' : 'opacity-0',
                        }}
                    />
                </label>

                <div className="flex gap-3 mt-6">
                    <Button type="submit" disabled={isLoading} variant="filled">
                        Войти
                    </Button>
                    <Button
                        disabled={isLoading}
                        variant="outlined"
                        type="reset"
                        onClick={() => {
                            dispatch(setOpen(false));
                            setPassword('');
                            setUsername('');
                        }}
                    >
                        Отменить
                    </Button>
                    <LoaderIcon
                        className={
                            'animate-spin opacity-0 transition ' +
                            (isLoading ? ' opacity-100' : '')
                        }
                    />
                </div>
            </form>
        </Modal>
    );
};

export default LoginModal;
