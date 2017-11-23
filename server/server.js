/**
 * Created by golanm on 02/11/2017.
 */

// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const routesAPI =  require('./api/api');

const app = express();

// Parsers for POST data
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // to support URL-encoded bodies

// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));


app.use('/api', routesAPI);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//routes.setup(app);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log("Server is up and listening on port %d", port));
