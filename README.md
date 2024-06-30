# Biletopoisk

## Structure

```
   src
    ├───components           -- components relying on data
    │   ├───icons            -- custom icon components 
    │   └───ui               -- custom ui components (e.g. Button, Input)
    ├───hooks                -- custom hooks
    ├───schemas              -- zod schemas (runtime validation)
    ├───slices               -- redux slices
    ├───utils                -- helper functions (e.g. tailwind merge)
    ├───views                -- page components
    │
    ├───main.tsx             -- entry point
    ├───App.tsx              -- wraps Outlet, Header, LoginModal
    ├───index.css            -- global styles (tailwind)
    ├───router.tsx           -- react-router-dom Router
    ├───config.tsx           -- app config
    └───store.tsx            -- redux store
```
    

## Stack

| purpose             | lib/tool         |
|---------------------|------------------|
| framework           | react            |
| routing             | react-router-dom |
| styling             | tailwind-css     |
| ui-components       | _**custom**_     |
| icons               | _**custom**_     |
| state managment     | redux (rtk)      |
| query-management    | rtk-query        |
| build tool          | vite             |
| pre-commit          | husky            |
| linting-formatting  | eslint-prettier  |
| package-management  | pnpm             |



