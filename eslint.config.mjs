import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
        Node: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLDivElement: 'readonly',
        MouseEvent: 'readonly',
        JSX: 'readonly',
      },
      parser: tseslint.parser,
    },
    plugins: {
      prettier,
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect', 
      },
    },
    rules: {
      'prettier/prettier': 'warn',

      'react/react-in-jsx-scope': 'off', 
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'warn',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'no-undef': 'off', 
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
    },
  },

  {
    ignores: ['node_modules', '.next', 'out', 'dist', 'public'],
  },
];
