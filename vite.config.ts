import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://192.168.0.100:3500/",
  //       changeOrigin: true,
  //       cookiePathRewrite: { "*": "/" },
  //     },
  //   },
  // },
  server: {
    host: '0.0.0.0',
  }
});
