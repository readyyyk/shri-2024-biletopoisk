import { AUTH_COOKIE_ATTRS_STR, LOCALSTORAGE_AUTH_KEY } from '@/config.ts';

export function getClientCookie(name: string): string | undefined {
    if (typeof document === 'undefined') {
        return undefined;
    }
    const raw = document.cookie
        .split('; ')
        .map((a) => a.split('='))
        .flat();
    const foundIndex = raw.findIndex((a) => a === name);
    return foundIndex === -1 ? undefined : raw[foundIndex + 1];
}

export function setAuthCookie(value: string) {
    if (typeof document === 'undefined') {
        return undefined;
    }

    document.cookie =
        LOCALSTORAGE_AUTH_KEY + '=' + value + '; ' + AUTH_COOKIE_ATTRS_STR;
}
