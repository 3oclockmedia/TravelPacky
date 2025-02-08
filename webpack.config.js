const webpack = require('@nativescript/webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
  webpack.init(env);

  webpack.chainWebpack((config) => {
    // Clean dist folder on rebuild
    config
      .plugin('clean')
      .use(CleanWebpackPlugin, [{
        cleanOnceBeforeBuildPatterns: ['**/*']
      }]);
  });

  // Enable HMR
  if (env.development) {
    config.devServer.hot(true);
  }

  return webpack.resolveConfig();
};