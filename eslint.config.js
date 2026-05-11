//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
    ...tanstackConfig,
    {
        rules: {
            'import/no-cycle': 'off',
            'import/order': 'off',
            'sort-imports': 'warn',
            'pnpm/json-enforce-catalog': 'off',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/array-type': ['error', { default: 'generic' }],
            'no-unused-vars': [
                'warn',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
        },
    },
    {
        ignores: ['eslint.config.js', 'prettier.config.js'],
    },
]
