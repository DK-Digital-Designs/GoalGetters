import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: './',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'pages/about.html'),
                booking: resolve(__dirname, 'pages/booking.html'),
                privacy: resolve(__dirname, 'pages/privacy.html'),
                cookies: resolve(__dirname, 'pages/cookies.html'),
                terms: resolve(__dirname, 'pages/terms.html'),
            },
        },
    },
});
