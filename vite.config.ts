import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      components: `${__dirname}/src/components`,
      styles: `${__dirname}/src/styles`,
      utils: `${__dirname}/src/utils`,
      types: `${__dirname}/src/types`,
      domains: `${__dirname}/src/domains`,
      pages: `${__dirname}/src/pages`,
    },
  },
  define: {
    "process.env": process.env,
    global: "window",
  },
});
