/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: false,
  endOfLine: 'lf',
  jsxSingleQuote: false,
  printWidth: 120,
  quoteProps: 'as-needed',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  plugins: [],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      options: {
        parser: 'babel-ts',
      },
    },
    {
      files: ['*.css'],
      options: {
        parser: 'css',
      },
    },
    {
      files: ['*.json'],
      options: {
        parser: 'json-stringify',
      },
    },
  ],
}

export default config
