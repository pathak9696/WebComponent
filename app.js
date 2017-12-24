// ------------------------------------------------------------- Require modules
const express = require('express');
const request = require('request');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const compiler = webpack(config);

// -------------------------------------------------------- Setup main variables
const app = express();
const port = '3000';
const publicPath = './dist';
const numberOfUsers = 20;
const apiPath = `https://randomuser.me/api/?results=${numberOfUsers}&nat=au`;

if (process.env.NODE_ENV === process.env.DEVELOPMENT) {
    // Only need in development
    app.use(webpackDevMiddleware(compiler,
      {noInfo: true, publicPath: config.output.publicPath}));
}
app.use(webpackHotMiddleware(compiler));

// ---------------------------------------------------------------------- Routes
// Setup static file routes
app.use(express.static(publicPath));

// Setup API call for generating random people
app.route('/api/v1/people')
    .get((req, res) => {
        // Load the users...
        request(apiPath, (err, response, body) => {
            // Map the needed data
            const users = JSON.parse(body).results.map(user => ({
                name: user.name,
                profile: user.picture.medium
            }));
            // Then return them
            res.json(users);
        });
    });


app.listen(port);
