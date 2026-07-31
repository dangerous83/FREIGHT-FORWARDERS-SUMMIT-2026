import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: 'dist',
        assetsInlineLimit: 4096,
        rollupOptions: {
            output: {
                manualChunks: {
                    motion: ['framer-motion'],
                    icons: ['lucide-react'],
                },
            },
        },
    },
});
