// SPDX-License-Identifier: GPL-3.0-or-later
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    // The whole site is one page of static markup. A visible budget is worth having:
    // a marketing page for an offline tool that ships half a megabyte of JavaScript is
    // making an argument against itself.
    chunkSizeWarningLimit: 250,
  },
});
