import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/ip_address": "http://localhost:8000",
    },
  },
  plugins: [react()],
});
