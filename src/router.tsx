import { createBrowserRouter, redirect } from 'react-router-dom';

import SingleMovie from '@/views/SingleMovie.tsx';

import App from './App.tsx';
import SearchView from './views/Search.tsx';

const HTTP_PERMANENTLY_MOVED = 302;

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                loader: () => {
                    return redirect('/search', {
                        status: HTTP_PERMANENTLY_MOVED,
                    });
                },
            },
            {
                index: true,
                path: 'search',
                loader: (args) => {
                    console.log(args.request.url);
                    return null;
                },
                element: <SearchView />,
            },
            {
                index: true,
                path: 'movie/:movieId',
                loader: (args) => {
                    console.log(args.request.url);
                    return null;
                },
                element: <SingleMovie />,
            },
        ],
    },
]);
