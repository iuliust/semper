const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const config = {
  target: 'node',
  entry: {
    'main': path.resolve(__dirname, '..', 'backend/server.ts')
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  externals: [nodeExternals({
    whitelist: [
      /^apollo-angular/,
      /^apollo-client/,
      /^apollo-client-rxjs/,
    ]
  })],
  node: {
    __dirname: true
  },
  output: {
    filename: './dist/dist-backend/[name].js',
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
};

module.exports = config;
