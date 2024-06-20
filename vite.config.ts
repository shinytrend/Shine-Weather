import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@UI": path.resolve(__dirname, "./src/components/UI"),
      "@pages": path.resolve(__dirname, "./src/components/pages"),
      "@forms": path.resolve(__dirname, "./src/forms"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@hoc": path.resolve(__dirname, "./src/hoc"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@styled": path.resolve(__dirname, "./src/styled"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces")
    }
  }
});
