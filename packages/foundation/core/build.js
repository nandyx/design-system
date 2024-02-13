const StyleDictionary = require('style-dictionary');
const { registerTransforms } = require('@tokens-studio/sd-transforms');

const { normalizeTokenName } = require('./lib/utils.js');

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
  type: 'value',
  formatter: function (dictionary) {
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

const sd = StyleDictionary.extend('core/config.json');
sd.cleanAllPlatforms(); // optionally, cleanup files first..
sd.buildAllPlatforms();
