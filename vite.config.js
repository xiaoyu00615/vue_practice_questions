import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [
      vue(),
      vueDevTools(),
      tailwindcss()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      proxy: {
        '/spark-api': {
          target: env.VITE_SPARK_API_URL,  // 使用加载loadEnv加载的环境变量
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/spark-api/, ''),
          secure: true,
          headers: {
            'Origin': env.VITE_SPARK_API_URL
          }
        }
      }
    }
  }
})