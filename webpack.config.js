module.exports = {
  entry: __dirname + '/src/main.ts',
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
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
      '.ts', '.js',
    ],
  },
  devServer: {
    firewall: false,
    port: 8080,
    static: require('path').join(__dirname, 'example'),
    open: false,
    hot: true,
  },
  optimization: {
    usedExports: true,
  },
};
