﻿require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./app/_middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// api routes
app.use('/users', require('./app/users/user.controller'));
app.use('/posts', require('./app/posts/post.controller'));
app.use('/downloads', require('./app/downloads/download.controller'));
app.use('/page', require('./app/page/page.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = 8080;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});