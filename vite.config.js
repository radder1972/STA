import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  // Builddatum, gebruikt voor 'Laatst bijgewerkt' op de verantwoordingspagina
  define: { __BUILD_DATE__: JSON.stringify(new Date().toISOString()) },
  plugins: [react(), viteSingleFile()],
})
