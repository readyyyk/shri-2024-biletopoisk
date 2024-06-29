import { z } from 'zod';

export const SuccessLoginSchema = z.object({
    token: z.string(),
});
export type SuccessLogin = z.infer<typeof SuccessLoginSchema>;
