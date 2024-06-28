import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
  { files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      'react/react-in-jsx-scope': 0,
      'react/jsx-uses-react': 0,
      '@typescript-eslint/no-explicit-any': 0,
      'react/no-unescaped-entities': 0,
      'react/prop-types': 0,
      '@typescript-eslint/no-unused-vars': 1,
      'react/display-name': 0,
    },
  },
  {
    ignores: [
      'mock-backend-server/*',
      'src/lib/themes/*',
      'postcss.config.js',
      'tailwind.config.js',
    ],
  },
];
