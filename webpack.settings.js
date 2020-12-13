/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const markup = () => new HtmlWebpackPlugin({
  template: 'src/index.html',
});

export const styles = (useCase) => {
  if (useCase === 'rules') {
    return {
      test: /\.(css|scss)$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: false,
          },
        },
        { loader: 'css-loader' },
        { loader: 'sass-loader' },
      ],
    };
  }
  if (useCase === 'plugin') {
    return new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    });
  }
};

export const scripts = () => ({
  test: /\.(js|jsx)$/,
  include: path.resolve(__dirname, 'src/js/'),
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env'],
  },
});
