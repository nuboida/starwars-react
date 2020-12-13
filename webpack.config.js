import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import {
  styles, scripts, markup,
} from './webpack.settings';

global.webpack = webpack;

export default {
  mode: 'development',
  entry: {
    main: [path.resolve(__dirname, 'src/js/index.js')],
  },
  output: {
    path: path.resolve(__dirname, 'dist/src'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [scripts(), styles('rules')],
  },
  plugins: [
    new CleanWebpackPlugin(),
    markup(),
    styles('plugin'),
  ],
};
