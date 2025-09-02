import { fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig, globalIgnores } from 'eslint/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default defineConfig([
  globalIgnores(['**/node_modules', '**/dist', '.yarn/*']),
  {
    extends: compat.extends('prettier', 'plugin:prettier/recommended'),

    plugins: {
      'react-hooks': fixupPluginRules(reactHooks)
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    settings: {
      react: {
        version: 'detect'
      }
    },

    rules: {
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',

      'max-len': [
        'error',
        {
          code: 140,
          ignoreUrls: true
        }
      ],

      'import/prefer-default-export': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off'
    }
  }
])
