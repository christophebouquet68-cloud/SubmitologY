import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ─── vite.config.js — replaces Create React App (2026-11-14) ────────────────
// CRA (react-scripts 5) was retired and had stopped getting fixes. This file
// keeps everything the site relied on from it, deliberately unchanged:
//
//   base "./"     CRA's `"homepage": "."` — every asset path is relative, so
//                 the build works from any folder. Code reaches public/ files
//                 through import.meta.env.BASE_URL (was process.env.PUBLIC_URL).
//   outDir build  CRA's output folder. Kept so .gitignore and the Vercel
//                 project need nothing changed; vercel.json pins it too.
//
// The router is hash-based (#/map), so no server rewrites are needed.
// Tests run on Vitest with jsdom, with Jest-style globals so the test files
// read as they did.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "build",
    // One bundle, as under CRA: ~660 kB raw, ~230 kB gzipped — the same as
    // before the move. Vite warns from 500 kB; CRA never did. Splitting it
    // is a separate decision, not part of the migration.
    chunkSizeWarningLimit: 800,
  },
  server: {
    port: 3000,   // CRA's port, so bookmarks and habits survive
    open: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
