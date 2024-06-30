'use client';

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { backendApi } from '@/slices/backend.ts';
import loginModalReducer from '@/slices/login-modal.ts';
import userRatesReducer from '@/slices/user-rates.ts';
import userReducer from '@/slices/user.ts';

export const makeStore = () => {
    const store = configureStore({
        reducer: {
            [backendApi.reducerPath]: backendApi.reducer,
            loginModalSlice: loginModalReducer,
            userSlice: userReducer,
            ratesSlice: userRatesReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(backendApi.middleware),
    });
    return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
