const path = require('path');

module.exports = function({ config }) {
  config.resolve.alias = {
    '~'           : path.resolve(__dirname, '../src/'),
    '~assets'     : path.resolve(__dirname, '../src/assets'),
    '~components' : path.resolve(__dirname, '../src/components'),
    '~pages'      : path.resolve(__dirname, '../src/pages'),
    '~store'      : path.resolve(__dirname, '../src/store'),
    '~util'       : path.resolve(__dirname, '../src/util'),
  };

  // For storysource if we want to bring it back.
  config.module.rules.unshift({
    test: /\.stories\.jsx?$/,
    loaders: [{
      loader: require.resolve('@storybook/source-loader'),
      options: {
        prettierConfig: {
          importFirst: 0,
        },
      },
    }],
    enforce: 'pre',
  });

  return config;
};
