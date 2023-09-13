module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  ecmaFeatures: {
    modules: true,
    spread: true,
    restParams: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'error',
    'max-len': ['error', { ignorePattern: 'd="([\\s\\S]*?)"', code: 120 }],
    'no-shadow': 'off',
  },
}
