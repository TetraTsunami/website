import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';

export default tseslint.config(
  {
    ignores: ['**/dist', '**/node_modules', '**/.astro', '**/.github', '**/.changeset'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['scripts/**'],
    languageOptions: {
      globals: globals.node,
    },
  },
	{
		rules: {
			'@typescript-eslint/no-unsafe-assignment': 'off',
		},
	}
);
