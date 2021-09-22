import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    server: {
        port: 3100,
    },
    build: {
        sourcemap: true, // build "*.map" files for JS sources
        manifest: false, // create a manifest.json for further processing of generated assets
    },
});
