require('babel/polyfill')
var expect = require('chai').expect
var Test = require('../src/test')

describe('Base', function() {
    it('should be defined', function () {
        expect(Test).to.be.defined
    })

    it('square should return a value', function () {
        var instance = new Test()

        expect(instance.square(2)).to.be.defined
    })

    it('square 2 should return 4 ', function () {
        var instance = new Test()

        expect(instance.square(2)).to.be.equal(4)
    })

    it('asycSquare 2 should return 4 and work with cb', function (done) {
        var instance = new Test()

        function cb(result) {
            expect(result).to.be.equal(4)
            done()
        }

        instance.asyncSquare(2, cb)
    })

    it('asycPromiseSquare 2 should return 4 via an promise', function (done) {
        var instance = new Test()

        instance.asyncPromiseSquare(2).then(function (result) {
            expect(result).to.be.equal(4)
            done()
        }, function () {
            console.log(arguments)
        })
    })

    it('promiseSquare 2 should return 4 via an promise', function (done) {
        var instance = new Test()

        instance.promiseSquare(2).then(function (result) {
            expect(result).to.be.equal(4)
            done()
        }, function () {
            console.log(arguments)
        })
    })

    it('promiseSquare continues calls should take less than 100ms', function (done) {
        var instance = new Test()

        instance.promiseSquare(2).then(function (result) {
            expect(result).to.be.equal(4)

            var start = process.hrtime()

            return instance.promiseSquare(2).then(function (result) {
                var end = process.hrtime(start)

                expect(result).to.be.equal(4)
                expect(end[0]).to.be.equal(0)
                expect(end[1]).to.be.below(100 * 1e6)

                done()
            }, function () {
                console.log(arguments)
            })
        }, function () {
            console.log(arguments)
        })
    })
})