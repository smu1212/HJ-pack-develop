/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  jsxSingleQuote: true,
  quoteProps: 'as-needed',
  parser: 'typescript',
  arrowParens: 'always',
  tabWidth: 2,
  printWidth: 80,
  useTabs: false,
  trailingComma: 'all',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/app/globals.css',
  tailwindAttributes: ['tw'],
  tailwindFunctions: ['cva'],
  tailwindPreserveWhiteSpace: true,
  tailwindPreserveDuplicates: true,
};

export default config;
