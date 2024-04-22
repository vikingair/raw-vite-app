// @ts-check

import js from "@eslint/js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import imp from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
// support will be added soon: https://github.com/facebook/react/pull/28773
// import hooksPlugin from "eslint-plugin-react-hooks";
import simpleImpSort from "eslint-plugin-simple-import-sort";
import ts from "typescript-eslint";

/** @type {any} Not type safe sadly */
// const hookRules = hooksPlugin.configs.recommended.rules;

export default ts.config(
  { ignores: ["node_modules", "dist"] },
  {
    files: ["**/*.{j,t}s?(x)"],
    extends: [js.configs.recommended, ...ts.configs.recommended],
    plugins: {
      prettier,
      import: imp,
      "simple-import-sort": simpleImpSort,
      // "react-hooks": hooksPlugin,
    },
    rules: {
      // ...hookRules,
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
      "@typescript-eslint/no-explicit-any": "off",
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
