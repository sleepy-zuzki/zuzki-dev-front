/* ESLint v9 Flat Config para TypeScript + Angular UI */
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  // Ignorar artefactos de build y dependencias
  {
    ignores: ['dist/**', 'node_modules/**']
  },

  // Reglas recomendadas para JS
  js.configs.recommended,

  // Reglas recomendadas para TypeScript
  ...tseslint.configs.recommended,

  // Reglas y settings comunes
  {
    plugins: {
      import: importPlugin
    },
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
    }
  },

  // Configuración específica para archivos TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      sourceType: 'module',
      ecmaVersion: 'latest',
      parserOptions: {
        project: false,
        tsconfigRootDir: __dirname
      }
    }
  }
];
