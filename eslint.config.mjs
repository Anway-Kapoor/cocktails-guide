import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: { extends: ["eslint:recommended"] },
});

// Use a simpler configuration that won't have serialization issues
export default [
  ...compat.extends("next/core-web-vitals"),
];
