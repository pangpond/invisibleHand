import { defineConfig, loadEnv } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      react(),
      monkey({
        entry: 'src/main.tsx',
        userscript: {
          name: 'Side Pane Data Viewer',
          namespace: 'http://tampermonkey.net/',
          match: [env.VITE_MATCH_URL],
          grant: ['GM_xmlhttpRequest', 'GM_addStyle'],
        },
      }),
    ],
  };
});
