import { defineConfig } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    esbuildPlugins: [
        sassPlugin({
            filter: /\.module\.scss$/,
            type: 'local-css',
        }),
    ],
});
