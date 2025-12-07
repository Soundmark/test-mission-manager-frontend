module.exports = {
  extends: [
    require.resolve('@umijs/max/eslint'),
    'plugin:sonarjs/recommended-legacy',
  ],
  plugins: ['prettier', 'sonarjs'], //使eslint能够监听到prettier的格式错误
  rules: {
    'prettier/prettier': 2,
    'global-require': 'off',
    'sonarjs/no-unused-vars': 'off',
    'sonarjs/no-clear-text-protocols': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  },
};
