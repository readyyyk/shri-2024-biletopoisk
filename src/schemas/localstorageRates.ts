import { z } from 'zod';

export const LocalUserRatesSchema = z.record(z.string(), z.number());
export type LocalUserRates = z.infer<typeof LocalUserRatesSchema>;
export type SingleRate = {
    id: keyof LocalUserRates;
    value: LocalUserRates[keyof LocalUserRates];
};
