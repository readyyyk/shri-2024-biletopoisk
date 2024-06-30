import { createBrowserRouter, redirect } from 'react-router-dom';

import { SELF_BASE_PATH } from '@/config.ts';
import SingleMovie from '@/views/SingleMovie.tsx';

import App from './App.tsx';
import SearchView from './views/Search.tsx';

const HTTP_PERMANENTLY_MOVED = 302;

export const router: ReturnType<typeof createBrowserRouter> =
    createBrowserRouter(
        [
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
                        element: <SearchView />,
                    },
                    {
                        index: true,
                        path: 'movie/:movieId',
                        element: <SingleMovie />,
                    },
                ],
            },
        ],
        { basename: SELF_BASE_PATH },
    );
