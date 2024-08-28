import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { resolve } from "path";

const splitModules: string[] = [
  // "react-rnd",
  // "react-icons"
];

export function renderChunks(deps: Record<string, string>) {
  const chunks: Record<string, string[]> = {};
  const addChunk = (key: string) => {
    if (key.startsWith("@types")) return;
    if (key.startsWith("remixicon")) return;
    if (["react", "react-router-dom", "react-dom"].includes(key)) return;
    chunks[key] = [key];
  };
  Object.keys(deps).forEach(addChunk);
  splitModules.forEach(addChunk);
  return chunks;
}

const libName = "milkdown-editor";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  base: `/${libName}`,
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
      {
        find: "xbook",
        replacement: resolve(__dirname, "src/xbook"),
      },
    ],
  },
  define: {
    "process.env": {},
  },
  build: {
    outDir: `build/lib/${libName}`,
    lib: {
      entry: "src/index.tsx",
      name: libName,
      formats: ["es", "umd", "system"],
      fileName(format, entryName) {
        return `${entryName}.${format}.js`;
      },
    },

    // minify: false,
    rollupOptions: {
      external: ["react", "react-dom"],
      // input: "src/index.tsx",

      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        inlineDynamicImports: true,
        manualChunks: undefined,
        // format: "systemjs",
        // manualChunks:()=>"editor",/
        // manualChunks: {
        //   vendor: ['react', 'react-dom'],
        //   ...renderChunks(dependencies),
        // },
      },
    },
  },
});
