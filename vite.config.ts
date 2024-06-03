import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue()
  ],
  server: {
    host: 'api.reanmo-tweeter.de',
    port: 8080,
    https: {
      key: 'C:\\certificates\\_wildcard.reanmo-tweeter.de-key.pem',
      cert: 'C:\\certificates\\_wildcard.reanmo-tweeter.de.pem',
    },
  }
})
