import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // Ensure consistent port
    strictPort: true,
  },
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": "/src", // Allows clean imports like "@/components/Login"
    },
  },
});
