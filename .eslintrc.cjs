/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  ignorePatterns: ['dist', 'coverage', ".eslintrc.cjs", "vite.config.ts"],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    requireConfigFile: false
  },
  rules: {
    'max-len': 'off',
    'consistent-return': 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'warn',
    'no-template-curly-in-string': 'off',
    'no-console': ['warn', { allow: ['info', 'error'] }],
    'react/prop-types': 'off',
    'react/jsx-indent': 'off',
    'react/no-children-prop': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unused-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/button-has-type': 'warn',
    'react/no-array-index-key': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['arrow-function'],
        unnamedComponents: 'arrow-function'
      }
    ],
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'sort-imports': 'off',
    'import/order': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'require-await': 'error'
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: './tsconfig.json'
      },
      extends: [
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended'
      ],
      rules: {
        'import/order': [
          'error',
          {
            pathGroups: [
              { pattern: 'react', group: 'builtin' },
              { pattern: 'vite', group: 'builtin' },
              { pattern: '~shared/**', group: 'internal' },
              { pattern: '~entities/**', group: 'internal' },
              { pattern: '~features/**', group: 'internal' },
              { pattern: '~widgets/**', group: 'internal' },
              { pattern: '~pages/**', group: 'internal' },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
            ],
            'newlines-between': 'never',
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: [
                  '~shared/*/*/**',
                  '~entities/*/**',
                  '~features/*/**',
                  '~widgets/*/**',
                  '~pages/*/**',
                  '~app/**',
                ],
                message:
                  'Direct access to the internal parts of the module is prohibited',
              },
              {
                group: [
                  '../**/shared',
                  '../**/entities',
                  '../**/features',
                  '../**/widgets',
                  '../**/pages',
                  '../**/app',
                ],
                message: 'Prefer absolute imports instead of relatives',
              },
            ],
          },
        ],
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: ['./vite.config.ts'] },
        ],
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/restrict-template-expressions': [
          'warn',
          { allowBoolean: true, allowNullish: true }
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { prefer: 'type-imports', disallowTypeAnnotations: false }
        ],
        'require-await': 'off',
        '@typescript-eslint/require-await': 'error'
      }
    }
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
