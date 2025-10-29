import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    root: 'demo', // указываем корень демо-приложения
    plugins: [react()],
});
