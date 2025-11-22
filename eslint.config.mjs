// eslint.config.mjs

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  // 1. Next.js recommended rules
  ...nextVitals,

  // 2. Next.js TypeScript rules
  ...nextTs,

  // 3. Prettier plugin (runs Prettier as an ESLint rule)
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },

  // 4. Prettier config (turns off ESLint rules that conflict with Prettier)
  prettierConfig,

  // 5. Ignores (unchanged from your original)
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
