var _ = require('lodash');

var lionsRouter = require('express').Router();

var lions = [];
var id = 0;

//this is the route middleware for extracting ids from route parameters
updateId = function name(req, res, next) {

    if (!req.body.id) {
        id++;
        req.body.id = id + '';
    }

    next();

}


//find the lion based off the id and attach it to req.lion
lionsRouter.param('id', function (req, res, next, id) {

    var lion = _.find(lions, { id: id });

    if (lion) {
        req.lion = lion;
        next();
    }
    else {
        res.send();
    }

})

// TODO: make the REST routes to perform CRUD on lions
lionsRouter.get('/', function (req, resp) {
    resp.json(lions);
});

lionsRouter.get('/:id', function (req, resp) {
    resp.json(req.lion || {});
});

lionsRouter.post('/', updateId, function (req, resp) {
    var lion = req.body;
    lions.push(lion);

    resp.json(lion);
});


lionsRouter.put('/:id', function (req, resp) {
    var update = req.body;

    if (update.id) {
        delete update.id;
    }

    if (!req.lion) {
        resp.send();
    } else {
        var updatedLion = _.assign(req.lion, update);
        resp.json(updatedLion);
    }
});


lionsRouter.delete('/:id', function (req, resp) {

    var lionIndex = _.findIndex(lions, { id: req.params.id });

    if (!lions[lionIndex]) {
        resp.send();
    } else {
        var deletedLion = lions[lionIndex];
        lions.splice(lionIndex, 1);
        resp.json(deletedLion);
    }
});

module.exports = lionsRouter;