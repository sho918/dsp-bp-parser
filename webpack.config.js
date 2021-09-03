const path = require('path');
const webpack = require('webpack');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = {
  entry: __dirname + '/src/main.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',

    library: {
      name: 'DspBpParser',
      export: 'default',
      type: 'umd',
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts', '.js', '.wasm',
    ],
  },
  devServer: {
    firewall: false,
    port: 8080,
    static: require('path').join(__dirname, 'example'),
    open: false,
    hot: true,
  },
  plugins: [
    new WasmPackPlugin({
      crateDirectory: __dirname,
      outName: 'md5f',
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  optimization: {
    usedExports: true,
  },
  experiments: {
    asyncWebAssembly: true,
  },
};
