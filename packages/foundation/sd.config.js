module.exports = {
  source: ['src/tokens/**/*.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/tokens/scss/',
      files: [
        {
          destination: 'tokens.scss',
          format: 'scss/variables',
        },
      ],
    },
    css: {
      transformGroup: 'css',
      buildPath: 'dist/tokens/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
      ],
    },
    'js-src': {
      transformGroup: 'js',
      buildPath: 'src/tokens/js/',
      files: [
        {
          name: 'tokens',
          destination: 'tokens.js',
          format: 'javascript/module',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/tokens/js/',
      files: [
        {
          name: 'tokens',
          destination: 'tokens.js',
          format: 'javascript/module',
        },
      ],
    },
  },
};
