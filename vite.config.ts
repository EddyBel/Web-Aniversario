import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// import.meta.env.VITE_API_URL

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    server: {
      port: env.VITE_PORT ? parseInt(env.VITE_PORT) : 3000,
    },
  });
};

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
