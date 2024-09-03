import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    extends: "next/core-web-vitals",
  },
  {
    rules: {
      "comma-dangle": [
        "error",
        {
          "arrays": "always-multiline",
          "objects": "always-multiline",
          "imports": "always-multiline",
          "exports": "always-multiline",
          "functions": "never",
        },
      ],
      "eol-last": [
        "error",
        "always",
      ],
      "function-paren-newline": [
        "error",
        "multiline",
      ],
      "indent": [
        "error",
        2,
      ],
      "no-console": 1,
      "no-multiple-empty-lines": [
        "error",
        {
          "max": 1,
          "maxEOF": 0,
        },
      ],
      "no-trailing-spaces": [
        "error",
        {
          "skipBlankLines": true,
        },
      ],
      "no-unused-vars": 1,
      "object-curly-newline": [
        "error",
        {
          "multiline": true,
          "consistent": true,
        },
      ],
      "object-curly-spacing": [
        "error",
        "always",
      ],
      "semi": [
        "error",
        "never",
      ],
      "space-in-parens": [
        "error",
        "never",
      ],
    },
  },
]
