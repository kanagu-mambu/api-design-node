var _ = require('lodash');

var tigersRouter = require('express').Router();

var tigers = [];
var id = 0;

//this is the route middleware for extracting ids from route parameters
updateId = function name(req, res, next) {

    if (!req.body.id) {
        id++;
        req.body.id = id + '';
    }

    next();

}


//find the tiger based off the id and attach it to req.tiger
tigersRouter.param('id', function (req, res, next, id) {

    var tiger = _.find(tigers, { id: id });

    if (tiger) {
        req.tiger = tiger;
        next();
    }
    else {
        res.send();
    }

})

// TODO: make the REST routes to perform CRUD on tigers
tigersRouter.get('/', function (req, resp) {
    resp.json(tigers);
});

tigersRouter.get('/:id', function (req, resp) {
    resp.json(req.tiger || {});
});

tigersRouter.post('/', updateId, function (req, resp) {
    var tiger = req.body;
    tigers.push(tiger);

    resp.json(tiger);
});


tigersRouter.put('/:id', function (req, resp) {
    var update = req.body;

    if (update.id) {
        delete update.id;
    }

    if (!req.tiger) {
        resp.send();
    } else {
        var updatedtiger = _.assign(req.tiger, update);
        resp.json(updatedtiger);
    }
});


tigersRouter.delete('/:id', function (req, resp) {

    var tigerIndex = _.findIndex(tigers, { id: req.params.id });

    if (!tigers[tigerIndex]) {
        resp.send();
    } else {
        var deletedtiger = tigers[tigerIndex];
        tigers.splice(tigerIndex, 1);
        resp.json(deletedtiger);
    }
});

module.exports = tigersRouter;