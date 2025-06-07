const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const path = require('path')
const webpack = require('webpack')
require('dotenv').config()

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: {
      index: '/index.html',
      rewrites: [
        { from: /^\/index\/catalogue/, to: '/index.html' },
        { from: /^\/index/, to: '/index.html' },
      ],
    },
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'crm',
      remotes: {
        catalogue: 'catalogue@http://localhost:3001/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_GW_API': JSON.stringify(process.env.REACT_APP_GW_API),
      'process.env.REACT_APP_CRM_API': JSON.stringify(process.env.REACT_APP_CRM_API),
    }),
  ],
}
