const StyleDictionary = require('style-dictionary');

console.log('Build started...');
console.log('\n==============================================');

// REGISTER THE CUSTOM TRANSFORMS

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
  name: 'size/pxToRem',
  type: 'value',
  matcher: function (token) {
    return (
      token.attributes.category === 'font' ||
      token.attributes.category === 'fontSize' ||
      token.attributes.category === 'lineHeights' ||
      token.attributes.category === 'margin'
    );
  },
  transformer: function (token) {
    return pxToRem(token.value);
  },
});

StyleDictionary.registerTransform({
  type: 'value',
  transitive: true,
  name: 'figma/web/flatten-properties',
  matcher: ({ type }) => {
    return ['typography', 'composition'].includes(type);
  },
  transformer: ({ value, name, type }) => {
    if (!value) return;

    const entries = Object.entries(value);

    const flattendedValue = entries.reduce(
      (acc, [key, v], index) =>
        `${acc ? `${acc}\n  ` : ''}--${name}-${StyleDictionary.transform[
          'name/cti/kebab'
        ].transformer({ path: [key] }, { prefix: '' })}: ${v}${
          index + 1 === entries.length ? '' : ';'
        }`,
      `${name.includes(type) ? '' : `${type}-`}${name}-group;`
    );

    return flattendedValue;
  },
});

StyleDictionary.registerTransform({
  name: 'ratio/%',
  type: 'value',
  matcher: function (token) {
    // here we are using a custom attribute, declared in the token, to match the values where apply the transform
    return token.group === 'ratio';
  },
  transformer: function (token) {
    return `${Math.floor(100 * token.value)}%`;
  },
});

StyleDictionary.registerTransformGroup({
  name: 'custom/web',
  // notice: here the "size/px" transform is not the pre-defined one, but the custom one we have declared above
  transforms: [
    'attribute/cti',
    'name/cti/constant',
    'size/pxToRem',
    'figma/web/flatten-properties',
    'color/css',
    'time/seconds',
    'ratio/%',
  ],
});

StyleDictionary.registerTransformGroup({
  name: 'custom/scss',
  // this is to show one possibility for adding a few transforms to a pre-defined group
  // (however, we suggest to use the previous approach, which is more explicit and clear)
  transforms: StyleDictionary.transformGroup['scss'].concat([
    'size/pxToRem',
    'figma/web/flatten-properties',
    'ratio/%',
  ]),
});
StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  // this is to show one possibility for adding a few transforms to a pre-defined group
  // (however, we suggest to use the previous approach, which is more explicit and clear)
  transforms: StyleDictionary.transformGroup['css'].concat([
    'size/pxToRem',
    'figma/web/flatten-properties',
    'ratio/%',
  ]),
});

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
const StyleDictionaryExtended = StyleDictionary.extend(
  __dirname + '/config.json'
);

// FINALLY, BUILD ALL THE PLATFORMS
StyleDictionaryExtended.buildAllPlatforms();

console.log('\n==============================================');
console.log('\nBuild completed!');
