'use client';

import { type PayloadAction, createSlice } from '@reduxjs/toolkit/react';

import { LOCALSTORAGE_AUTH_KEY } from '@/config.ts';

type State = { logged: false } | { logged: true; token: string };

const initiate = (): State => {
    if (typeof window === 'undefined') {
        return {
            logged: false,
        };
    }
    const initialToken = window.localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
    const initialState: State = initialToken?.length
        ? {
              logged: true,
              token: initialToken,
          }
        : {
              logged: false,
          };
    return initialState;
};

const userSlice = createSlice({
    name: 'user',
    initialState: initiate(),
    reducers: {
        setState: (_, action: PayloadAction<State>) => action.payload,
        setToken: (_, action: PayloadAction<string>) => {
            if (action.payload.length) {
                window.localStorage.setItem(
                    LOCALSTORAGE_AUTH_KEY,
                    action.payload,
                );
                return {
                    logged: true,
                    token: action.payload,
                };
            } else {
                window.localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
                return {
                    logged: false,
                };
            }
        },
    },
});
export const { setState, setToken } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
