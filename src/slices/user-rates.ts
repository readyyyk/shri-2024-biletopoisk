'use client';

import { type PayloadAction, createSlice } from '@reduxjs/toolkit/react';

import { LOCALSTORAGE_USER_RATES_KEY } from '@/config.ts';
import {
    type LocalUserRates,
    LocalUserRatesSchema,
    type SingleRate,
} from '@/schemas/localstorageRates.ts';

const initialRatesStr: string =
    (typeof window !== 'undefined'
        ? window.localStorage.getItem(LOCALSTORAGE_USER_RATES_KEY)
        : '') ?? '';

let parsed: unknown;
try {
    parsed = JSON.parse(initialRatesStr);
} catch {
    parsed = false;
}

const initialRates =
    parsed === false
        ? ({
              success: false,
              error: 'Error parsing JSON from localStorage',
          } as const)
        : LocalUserRatesSchema.safeParse(parsed);
const fallbackRates: LocalUserRates = {};
if (initialRatesStr?.length && !initialRates.success) {
    console.warn(
        `Error parsing initial user rates. \n\tCheck localStorage["${LOCALSTORAGE_USER_RATES_KEY}"]`,
        initialRates.error,
    );
}

const userRatesSlice = createSlice({
    name: 'user-rates',
    initialState: initialRates.success ? initialRates.data : fallbackRates,
    reducers: {
        setSingle: (state, { payload }: PayloadAction<SingleRate>) => {
            state[payload.id] = payload.value;
            window.localStorage.setItem(
                LOCALSTORAGE_USER_RATES_KEY,
                JSON.stringify(state),
            );
        },
    },
});

export const { setSingle } = userRatesSlice.actions;
const userRatesReducer = userRatesSlice.reducer;
export default userRatesReducer;
