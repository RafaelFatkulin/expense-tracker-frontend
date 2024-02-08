import {resolve} from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import unfonts from 'unplugin-fonts/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), unfonts({
    google: {
      families: [
        {name: 'Inter', styles: 'wght@100;200;300;400;500;600;700;800;900'}
      ]
    }
  })],
  resolve: {
    alias: {
      '~app': resolve('src/app'),
      '~entities': resolve('src/entities'),
      '~features': resolve('src/features'),
      '~pages': resolve('src/pages'),
      '~shared': resolve('src/shared'),
      '~widgets': resolve('src/widgets'),
    },
  },
})
