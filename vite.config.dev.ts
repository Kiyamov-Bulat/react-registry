import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';

export default defineConfig({
    root: 'demo', // указываем корень демо-приложения
    plugins: [react()],
    build: {
        outDir: path.join(__dirname, 'demo_dist'),
    },
});
