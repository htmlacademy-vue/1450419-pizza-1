module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/strongly-recommended",
    "eslint:recommended",
    "plugin:prettier-vue/recommended"
    ],
  parserOptions: {
    parser: "babel-eslint",
  },
  settings: {
    'prettier-vue': {
      // ignoring template tag
      SFCBlocks: {
        template: false
      }
    }
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/max-attributes-per-line": ["warn", {
      "singleline": 1,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/attributes-order": ["error", {
      "order": [
        "DEFINITION",
        "LIST_RENDERING",
        "CONDITIONALS",
        "RENDER_MODIFIERS",
        "GLOBAL",
        ["UNIQUE", "SLOT"],
        "TWO_WAY_BINDING",
        "OTHER_DIRECTIVES",
        "OTHER_ATTR",
        "EVENTS",
        "CONTENT"
      ],
      "alphabetical": false
    }],
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
