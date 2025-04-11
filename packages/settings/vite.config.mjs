import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  resolve: {
    alias: {
      "design-system": path.resolve(__dirname, "../design-system/src/"),
      adapters: path.resolve(__dirname, "../adapters/src/")
    },
    extensions: [".ts", ".tsx", ".js", ".mjs"]
  },
  plugins: [react()],
  server: {
    port: 4000,
    open: true,
    historyApiFallback: true
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        entryFileNames: "assets/main.js",
        assetFileNames: "assets/main.[ext]"
      }
    }
  }
})
