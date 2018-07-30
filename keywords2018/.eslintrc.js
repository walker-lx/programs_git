// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
		'arrow-parens': 0,
		'new-cap': 0,
    // allow async-await
		'generator-star-spacing': 0,
		'no-new': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    // "indent": ["error", 'tab'],
    'eol-last': 0,
    'indent': [
      'error',
      'tab',
      {
        'SwitchCase': 1
      }
    ],
    'no-tabs': 'off',
    'quotes': [
      'error',
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ],
    'no-unused-vars': [
      'error',
      {
        'vars': 'all',
        'args': 'after-used'
      }
    ],
    'brace-style': [
      'error',
      'stroustrup'
    ],
    // "linebreak-style": [
    //   "error",
    //   "windows"
    // ],
    'semi': 0,
    'no-console': 0,
    'prefer-const': 0,
    'prefer-template': 0,
    'no-param-reassign': 0,
    'comma-dangle': [
      1,
      'never'
    ],
    'spaced-comment': [
      0,
      'always'
    ],
    'func-names': 0,
    'no-underscore-dangle': 0,
    // "import/prefer-default-export": 1,
    'class-methods-use-this': 0,
    'no-prototype-builtins': 0,
    // "import-extraneous-dependencies": 1,
    'radix': 0
  }
}
