import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-empty-object-type': 'error',
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      '@typescript-eslint/no-implied-eval': 'off',
      'no-implied-eval': 'error',
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-inferrable-types": "off", // Disables linting for types that can be inferred
      "@typescript-eslint/explicit-function-return-type": "off", // Disables requiring explicit return types
      "@typescript-eslint/no-use-before-define": "off", // Allows you to use functions before they are defined
      "@typescript-eslint/no-this-alias": "off", 
      "@typescript-eslint/ban-ts-comment": "off", // Allows usage of @ts-ignore and similar comments
      "@typescript-eslint/ban-types": "off", // Disables banning certain types like '{}'
    },
  },
)
