const HtmlWebpackPlugin = require('html-webpack-plugin');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
          },
        },
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './dist/index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
    port: 8080, // or any other port you want to use
    proxy: {
      '/locations': {
        target: 'http://dataservice.accuweather.com',
        changeOrigin: true,
        pathRewrite: {
          '^/locations': '/locations',
        },
      },
    },
  },
};
