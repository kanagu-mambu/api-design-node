var app = require('./server')
var request = require('supertest')
const { iteratee } = require('lodash')
var expect = require('chai').expect

describe('[LIONS]', function () {

    it('should get all lions', function (done) {
        request(app)
            .get('/lions')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, resp) {
                expect(resp.body).to.be.an('array')
                done()
            })
    })

    it('should create a lion', function (done) {
        request(app)
            .post('/lions')
            .send({
                name: 'Mufasa',
                age: 100,
                pride: 'evil lion',
                gender: 'male'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, resp) {
                expect(resp.body).to.be.an('object')
                done()
            })
    })

    it('should delete a lion', function (done) {
        request(app)
            .post('/lions')
            .send({
                name: 'Mufasa',
                age: 100,
                pride: 'evil lion',
                gender: 'male'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, resp) {
                var lion = resp.body;
                request(app)
                    .delete('/lions/' + lion.id)
                    .end(function (err, resp) {
                        expect(resp.body).to.eql(lion)
                        done()
                    })
            })
    })

    it('should update a lion', function (done) {
        request(app)
            .post('/lions')
            .send({
                name: 'Mufasa',
                age: 100,
                pride: 'evil lion',
                gender: 'male'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, resp) {
                var lion = resp.body;
                request(app)
                    .put('/lions/' + lion.id)
                    .send({
                        name: 'Mufasa Updated'
                    })
                    .end(function (err, resp) {
                        expect(resp.body.name).to.equal('Mufasa Updated')
                        done()
                    })
            })
    })

    it('should get a lion', function (done) {
        request(app)
            .post('/lions')
            .send({
                name: 'Mufasa',
                age: 100,
                pride: 'evil lion',
                gender: 'male'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, resp) {
                var lion = resp.body;
                request(app)
                    .get('/lions/' + lion.id)
                    .end(function (err, resp) {
                        expect(resp.body).to.eql(lion)
                        done()
                    })
            })
    })

})