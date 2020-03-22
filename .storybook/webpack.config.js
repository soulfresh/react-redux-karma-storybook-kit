const path = require('path');

module.exports = function({ config }) {
  config.resolve.alias = {
    '~': path.resolve(__dirname, '../src/'),
  };

  config.module.rules.unshift({
    test: /\.(story|stories)\.(js|jsx)?$/,
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
