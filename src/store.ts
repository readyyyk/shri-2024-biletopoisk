import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { useDispatch, useSelector } from 'react-redux';

import { backendApi } from '@/slices/backend.ts';
import loginModalReducer from '@/slices/login-modal.ts';
import userReducer from '@/slices/user.ts';

export const store = configureStore({
    reducer: {
        [backendApi.reducerPath]: backendApi.reducer,
        loginModalSlice: loginModalReducer,
        userSlice: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(backendApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
