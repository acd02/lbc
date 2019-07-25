module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:react/recommended',
    'plugin:prettier/recommended' // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },
  rules: {
    // Overwrite rules specified from the extended configs or add ones
    // Typescript
    '@typescript-eslint/prefer-interface': 0,
    '@typescript-eslint/no-object-literal-type-assertion': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-use-before-define': 0,
    // React
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-key': 0,
    'react/display-name': [0, { ignoreTranspilerName: false }],
    // Misc
    'curly': ["error", "multi", "consistent"],
    'max-lines': [1, { max: 100, skipBlankLines: true, skipComments: true }],
    'max-len': ['error', { code: 90, ignoreTemplateLiterals: true }],
    'newline-before-return': 2,
    'no-console': ["error", { allow: ["error"] }],
    'no-debugger': 2,
    'no-shadow': 2,
    'no-var': 2,
    'prefer-const': 2,
    quotes: ['error', 'single', { allowTemplateLiterals: false }],
    'space-before-function-paren': ['error', 'never']
  }
}
