import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// import.meta.env.VITE_API_URL

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const port = env.VITE_PORT ? parseInt(env.VITE_PORT) : 3000;

  return defineConfig({
    plugins: [react()],
    server: {
      port: port,
      proxy: {
        '/': {
          target: `http://localhost:${port}/`, // cambia la URL base a tu aplicación
          changeOrigin: true,
          rewrite: (path) => '/index.html',
        },
      },
    },
  });
};

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
