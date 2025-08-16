/* eslint-env node */
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    rules: {
      'react/display-name': 'off',
      // Ignore unresolved for Babel-virtual module transformed by react-native-dotenv
      'import/no-unresolved': ['error', { ignore: ['^@env$'] }],
    },
  },
]);
