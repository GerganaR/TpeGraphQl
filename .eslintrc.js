module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
  },
  parserOptions: {
    sourceType: 'module',
  },
  ignorePatterns: ['build/'],
}
