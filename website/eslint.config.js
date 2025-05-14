// Modified from https://github.com/skeletonlabs/skeleton/blob/main/eslint.config.js
import javascript from '@eslint/js';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import importSort from 'eslint-plugin-simple-import-sort';
import typescript from 'typescript-eslint';

/**
 * @see https://eslint.org/docs/latest/use/configure/
 * @type {import('eslint').Linter.Config}
 */
export default typescript.config(
  {
    ignores: ['**/node_modules/', '**/dist/', '**/build/', '**/pagefind/', '**/.svelte-kit/', '**/.astro/', '**/.next/', '**/.vercel/'],
  },
  // Prettier
  prettier,
  // JavaScript
  javascript.configs.recommended,
  // TypeScript
  typescript.configs.recommended,
  // Astro
  astro.configs.recommended,
  // React
  {
    files: ['**/*.tsx', '**/*.jsx'],
    ...react.configs.flat.recommended,
    ...react.configs.flat['jsx-runtime'],
  },
  {
    plugins: {
      'simple-import-sort': importSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  }
);
