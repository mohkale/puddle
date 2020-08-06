module.exports = {
  "env": {
    "browser": true,
    "es2020": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "ignorePatterns": ["**/__tests__/**/*"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-fallthrough": "off",
    "no-duplicate-imports": "warn",
    "react/display-name": "warn",
    "react/prop-types": "off",
    "no-case-declarations": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "varsIgnorePattern": "_",
        "argsIgnorePattern": "_",
      }
    ],
  },
};
