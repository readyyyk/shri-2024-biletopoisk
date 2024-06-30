export const LOCALSTORAGE_AUTH_KEY = 'Authorization';
export const LOCALSTORAGE_USER_RATES_KEY = 'user-rates';
export const BASE_API_URL = 'http://localhost:3030/api/v1/';

export const SELF_BASE_PATH = '/shri-2024-biletopoisk';

const AUTH_COOKIE_ATTRS = Object.freeze({
    // httpOnly: true,
    // "same-site": true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // One month
    path: '/',
});

export const AUTH_COOKIE_ATTRS_STR = Object.entries(AUTH_COOKIE_ATTRS).reduce(
    (acc, el) => {
        if (el[1] === false) return acc;
        const value = el[1] !== true ? '=' + el[1] : '';
        return acc + el[0] + value + '; ';
    },
    '',
);
