import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    root: 'src', // A src mappa lesz a gyökér
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
    },
});
