import { type PayloadAction, createSlice } from '@reduxjs/toolkit/react';

const loginModalSlice = createSlice({
    name: 'login-modal',
    initialState: false,
    reducers: {
        setOpen: (_, action: PayloadAction<boolean>) => action.payload,
    },
});

export const { setOpen } = loginModalSlice.actions;
const loginModalReducer = loginModalSlice.reducer;
export default loginModalReducer;
