import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/UCHI/',  // 👈 VERY IMPORTANT! Use your GitHub repo name here
  plugins: [react()],
})

