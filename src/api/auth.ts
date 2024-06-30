import { BASE_API_URL } from '@/config.ts';
import { SuccessLoginSchema } from '@/schemas/login.ts';

export const login = async (body: { username: string; password: string }) => {
    const url = BASE_API_URL + 'login';
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
        }).then((res) => res.json());
        return SuccessLoginSchema.safeParse(response);
    } catch (e: unknown) {
        return { success: false, error: String(e) } as const;
    }
};
