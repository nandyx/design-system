const StyleDictionary = require('style-dictionary');
const { registerTransforms } = require('@tokens-studio/sd-transforms');

const { normalizeTokenName } = require('../lib/utils');

registerTransforms(StyleDictionary);

function pxToRem(value) {
  const baseFontSize = 16;
  if (typeof value === 'number') {
    return `${value / baseFontSize}rem`;
  } else if (value.includes('rem')) {
    return value;
  } else {
    return `${value / baseFontSize}rem`;
  }
}

StyleDictionary.registerTransform({
  type: 'value',
  name: 'myCustomTransform',
  matcher: (token) => {},
  transformer: (token) => {
    return pxToRem(token.value); // <-- transform as needed
  },
});
StyleDictionary.registerFormat({
  name: 'css/variables',
  formatter: function (dictionary, config) {
    return `:root{
    ${dictionary.allProperties
      .map((prop) => {
        return `${'--' + 'mds-' + normalizeTokenName(prop.path.join('-'))}:${
          prop.value
        };`;
      })
      .join('\n')}
    }`;
  },
});

const sd = StyleDictionary.extend({
  source: ['data/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      basePxFontSize: '16',
      buildPath: 'dist/css/',
      files: [
        {
          destination: '_variables.css',
          format: 'css/variables',
        },
      ],
    },
    scss: {
      transformGroup: 'tokens-studio',
      prefix: 'mds',
      buildPath: 'dist/scss/',
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables',
        },
      ],
    },
    'js-src': {
      transformGroup: 'js',
      buildPath: 'data/js/',
      files: [
        {
          name: 'tokens',
          destination: 'tokens.js',
          format: 'javascript/module',
        },
      ],
    },
    js: {
      transformGroup: 'tokens-studio',
      buildPath: 'dist/js/',
      prefix: 'mds',
      files: [
        {
          destination: 'variables.js',
          format: 'javascript/es6',
        },
      ],
    },
  },
});
sd.cleanAllPlatforms(); // optionally, cleanup files first..
sd.buildAllPlatforms();
