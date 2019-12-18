const path = require('path');

module.exports = function({ config }) {
  config.resolve.alias = {
    '~'           : path.resolve(__dirname, '../src/'),
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
