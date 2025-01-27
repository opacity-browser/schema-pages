import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  resolve: {
    alias: {
      adapters: path.resolve(__dirname, "../adapters/src/")
    },
    extensions: [".ts", ".tsx", ".js", ".mjs"]
  },
  plugins: [react()],
  server: {
    port: 4000,
    open: true,
    historyApiFallback: true
  }
})
