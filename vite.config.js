import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  // server:{
  //   proxy:{
  //     '/api': 'http://localhost:5173'
  //   }
  // },
  plugins: [react()],
})



//! The proxy added above is for avoiding CORS error
