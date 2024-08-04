// @ts-check

import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import simpleImpSort from "eslint-plugin-simple-import-sort";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

/**
 * source: https://github.com/import-js/eslint-plugin-import/issues/2948#issuecomment-2148832701
 * @param {string} name the pugin name
 * @param {string} alias the plugin alias
 * @returns {import("eslint").ESLint.Plugin}
 */
function legacyPlugin(name, alias = name) {
  const plugin = compat.plugins(name)[0]?.plugins?.[alias];

  if (!plugin) {
    throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`);
  }

  return fixupPluginRules(plugin);
}

export default ts.config(
  { ignores: ["node_modules", "dist"] },
  {
    files: ["**/*.{j,t}s?(x)"],
    extends: [
      js.configs.recommended,
      ...ts.configs.recommended,
      react.configs.flat["jsx-runtime"],
    ],
    plugins: {
      prettier,
      // see https://github.com/import-js/eslint-plugin-import/issues/2948
      import: legacyPlugin("eslint-plugin-import", "import"),
      "simple-import-sort": simpleImpSort,
      // will be eventually replaced by the new eslint-plugin-react-compiler when React 19 gets released
      "react-hooks": legacyPlugin("eslint-plugin-react-hooks", "react-hooks"),
      react,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "prettier/prettier": "warn",
      "arrow-body-style": ["warn", "as-needed"],
      "no-console": "warn",
      eqeqeq: ["error", "always"],
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            [
              "vitest",
              // scss and css file imports
              "\\.s?css$",
              // side effect (e.g. `import "./foo"`)
              "^\\u0000",
              // every import starting with "react"
              "^react",
              // things that start with a letter (or digit or underscore), or `@` followed by a letter
              "^@?\\w",
              // internal relative paths
              "^\\.",
            ],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
      "no-restricted-imports": [
        "error",
        {
          patterns: ["**/build/*", "**/dist/*"],
        },
      ],
      "import/no-duplicates": "warn",
      "import/no-commonjs": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "no-var": "off",
    },
  },
  {
    files: ["**/*.test.ts?(x)"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
);
