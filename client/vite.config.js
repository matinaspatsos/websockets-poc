import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/events": {
        target: "ws://localhost:3000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
