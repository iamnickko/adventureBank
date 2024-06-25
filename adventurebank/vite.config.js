import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.js"],
    testMatch: ["./tests/**/*.test.jsx$?"],
    globals: true,
  },
});
