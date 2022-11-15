/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    './.eslintrc-auto-import.json',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'generator-star-spacing': 'off',
    'vue/script-setup-uses-vars': ['off'],
    'vue/multi-word-component-names': ['off'],
    'vue/no-mutating-props': ['off'],
    'vue/valid-model-definition': ['off'],
    'vue/valid-attribute-name': ['off'],
    'vue/comment-directive': ['off'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
  },
}
