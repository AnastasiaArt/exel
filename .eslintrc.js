module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'require-jsdoc': 'off',
  },
  parserOptions: {
    'requireConfigFile': false,
  },
};
