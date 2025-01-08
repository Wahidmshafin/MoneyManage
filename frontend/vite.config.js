import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    // strictPort: true,
    host: true,
    // origin: "https://0.0.0.0:3000",
    // proxy:{
    //   '/v1':{
    //     target:'http://0.0.0.0:8000',
    //     changeOrigin:true,
    //   }
    // }
   },
   test:{
    environment:'jsdom',
    globals: true
    
   },
  plugins: [react()],
  // base:'/'
})
