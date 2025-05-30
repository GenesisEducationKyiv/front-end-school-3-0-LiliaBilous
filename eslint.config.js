import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import typescript from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// __dirname для ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default [
    js.configs.recommended,
    {
        files: ['**/*.vue', '**/*.ts', '**/*.js'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                tsconfigRootDir: __dirname,
                project: ['./tsconfig.json'], // 🔥 ключове
                ecmaVersion: 2020,
                sourceType: 'module',
                extraFileExtensions: ['.vue']
            },
            globals: {
                defineProps: 'readonly',
                defineEmits: 'readonly',
                defineExpose: 'readonly',
                withDefaults: 'readonly'
            }
        },
        plugins: {
            vue,
            '@typescript-eslint': typescript
        },
        rules: {
            // TS строгість
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
            '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
            '@typescript-eslint/no-inferrable-types': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

            // Vue строгість
            'vue/no-mutating-props': 'error',
            'vue/require-explicit-emits': 'error',
            'vue/no-ref-as-operand': 'error',

            // Опціонально
            'vue/require-default-prop': 'off',
            'vue/multi-word-component-names': 'off'
        }
    }
]
