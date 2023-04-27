import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
    server:{
        port:8082,
        host:false,
        proxy: {
            '/app': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/app/, ""),
            }
        },
    },
  plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      })
  ],
})
