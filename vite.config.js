import { resolve } from "path"
import { defineConfig } from "vite"

const root = resolve(__dirname, "src")
const outDir = resolve(__dirname, "dist")

export default defineConfig({
  base: "/eagenda-vite/",
  root: root,
  build: {
    outDir: outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(root, "index.html"),
        task: resolve(root, "task-module/views/task.html"),
        taskCreate: resolve(root, "task-module/views/task.create.html"),
      }
    }
  },
  publicDir: "../public"
})