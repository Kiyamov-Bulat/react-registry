import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'react-registry',
            formats: ['es', 'cjs'],
            fileName: (format) => {
                if (format === 'es') return 'index.mjs'; // ← ES-модуль
                if (format === 'cjs') return 'index.js'; // ← CommonJS
                return `index.${format}.js`;
            },
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                },
            },
        },
    },
    plugins: [
        react(),
        cssInjectedByJsPlugin({
            topExecutionPriority: true,
            suppressUnusedCssWarning: true,
        }),
        dts({
            insertTypesEntry: true,
            rollupTypes: true,
        }),
    ],
    publicDir: false,
});
