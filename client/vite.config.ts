import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    // host: '0.0.0.0',
    port: 8000,
    // Use polling for hot reload in environments where fs events don't propagate correctly (e.g., Docker on macOS)
    watch: {
      usePolling: true
    }
  }
})
