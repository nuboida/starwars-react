/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import webpack from 'webpack';
import config from '../webpack.config';

const app = express();
const compile = webpack(config);

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  require('webpack-dev-middleware')(compile, {
    publicPath: config.output.publicPath,
  }),
);

app.use(express.static(path.join(__dirname, '../public')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

export default app;
