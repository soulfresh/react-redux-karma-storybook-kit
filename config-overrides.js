const path = require('path');
const {
  override,
  addWebpackAlias,
} = require('customize-cra');

module.exports = override(addWebpackAlias({
  '~': path.resolve(__dirname, 'src/'),
  '~assets': path.resolve(__dirname, 'src/assets'),
  '~components': path.resolve(__dirname, 'src/components'),
  '~pages': path.resolve(__dirname, 'src/pages'),
  '~store': path.resolve(__dirname, 'src/store'),
}));

