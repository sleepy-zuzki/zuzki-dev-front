/* ESLint config para TypeScript + Angular UI */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: false,
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  settings: {
    'import/resolver': {
      typescript: true
    }
  },
  rules: {
    // Permitimos barrels internos; la restricción se centra en deep imports de UI.
    'import/no-internal-modules': 'off',
    'no-restricted-imports': ['error', {
      patterns: [
        {
          group: ['@components/ui/*', '@components/ui/*/**'],
          message: 'Importa componentes de UI desde @ui'
        }
      ]
    }]
  },
  ignorePatterns: ['dist/', 'node_modules/']
};
