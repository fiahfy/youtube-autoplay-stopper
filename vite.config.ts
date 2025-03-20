import { crx, defineManifest } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import packageJson from './package.json'

const { description, version, productName } = packageJson

const manifest = defineManifest({
  name: productName,
  description,
  version,
  manifest_version: 3,
  icons: {
    128: 'icon.png',
  },
  background: {
    service_worker: 'src/background.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['https://www.youtube.com/*'],
      js: ['src/content-script.ts'],
    },
  ],
  action: {
    default_icon: 'icon.png',
    default_popup: 'src/popup.html',
  },
  permissions: ['storage'],
  host_permissions: ['https://www.youtube.com/*'],
})

export default defineConfig({
  plugins: [react(), crx({ manifest }), tsconfigPaths()],
  server: {
    port: 9012,
    hmr: { port: 9012 },
    cors: {
      origin: [
        // ⚠️ SECURITY RISK: Allows any chrome-extension to access the vite server ⚠️
        // See https://github.com/crxjs/chrome-extension-tools/issues/971 for more info
        // I don't believe that the linked issue mentions a potential solution
        /chrome-extension:\/\//,
      ],
    },
  },
  legacy: {
    // ⚠️ SECURITY RISK: Allows WebSockets to connect to the vite server without a token check ⚠️
    // See https://github.com/crxjs/chrome-extension-tools/issues/971 for more info
    // The linked issue gives a potential fix that @crxjs/vite-plugin could implement
    skipWebSocketTokenCheck: true,
  },
})
