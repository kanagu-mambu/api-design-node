// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');


var lionsRouter = require('./lions')
var tigersRouter = require('./tigers')


//middleware for logging
app.use(morgan('dev'))


// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/lions', lionsRouter);
app.use('/tigers', tigersRouter);




//error handling middleware
app.use(function (err, req, res, next) {
    if (err) {
        res.status(500).send(err)
    }
})

app.listen(3000);
console.log('on port 3000');
