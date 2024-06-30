'use client';

export const setSearchParams = (
    callback: (previous: URLSearchParams) => URLSearchParams,
) => {
    if (typeof window === 'undefined') {
        return null;
    }

    const previous = new URLSearchParams(window.location.search);

    const newSearchParams = callback(previous);

    window.history.pushState({}, '', '?' + newSearchParams.toString());
};
