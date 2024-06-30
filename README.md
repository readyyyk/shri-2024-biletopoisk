# Biletopoisk (NEXT.js)

> base route is `/shri-2024-biletopoisk` for deploying to gh-pages

## Structure

```

   src
    ├───app                       ┌─  
    │   ├───movie                 │ next.js
    │   │   └───[movieId]         │ routing
    │   ├───search                └─
    │   │
    │   ├───StoreProvider.tsx     -- custom redux store provider
    │   └───route.ts              -- redirect to /search 
    ├───components                -- components relying on data
    │   ├───icons                 -- icon components
    │   └───ui                    -- simple ui components
    ├───hooks                     -- custom hooks
    ├───schemas                   -- zod schemas (runtime validation)
    ├───slices                    -- redux slices
    ├───utils                     -- helper functions (e.g. tailwind merge)
    │
    ├───index.css                 -- global styles (tailwind)
    ├───config.tsx                -- app config
    └───store.tsx                 -- redux store
```
    

## Stack

| purpose             | lib/tool                    |
|---------------------|-----------------------------|
| framework           | next.js                     |
| routing             | next.js                     |
| styling             | tailwind-css                |
| ui-components       | _**custom**_                |
| icons               | _**custom**_                |
| state managment     | redux (rtk)                 |
| query-management    | rtk-query                   |
| build tool          | next.js (webpack+turbopack) |
| pre-commit          | husky                       |
| linting-formatting  | eslint-prettier             |
| package-management  | pnpm                        |

