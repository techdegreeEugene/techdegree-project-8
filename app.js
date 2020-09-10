const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const routes = require('./routes/index');
const books = require('./routes/books');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/books', books);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  const err = new Error('Not found');
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res, next) => {
	err.status = err.status || 500;
	err.message = err.message || 'Oops, there was an error on the server';
	res.locals.error = err;
	res.status(err.status);
	if(err.status === 404) {
		res.render('page-not-found');
	} else {
		res.render('error');
	}
});

module.exports = app;
