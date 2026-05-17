import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/build/**',
      '**/coverage/**',
      'dist',
      '.yarn/*',
      '.env',
      '.env.local',
      '.env.*.local',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooks,
      prettier,
    },
    rules: {
      ...prettier.configs.recommended.rules,
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'max-len': ['error', { code: 140, ignoreUrls: true }],
      'import/prefer-default-export': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
];
