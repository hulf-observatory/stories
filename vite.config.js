import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// VITE_BASE: the path the site is served from; '/stories/' at hyderabad.urbanobservatory.in/stories/ (since 24 Oct 2026).
export default defineConfig({
  base: process.env.VITE_BASE || '/stories/',
  plugins: [react()],
});
