import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

import { SELF_BASE_PATH } from './src/config.ts';

export default defineConfig({
    plugins: [react()],
    base: SELF_BASE_PATH,
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
