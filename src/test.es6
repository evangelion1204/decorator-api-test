'use strict'

var Logger = require('./logger')
var PromiseDecorator = require('./promise')
var CachePromise = require('./cache_promise')

class Test {
    @Logger('Prefix')
    square(x) {
        return x * x
    }

    asyncSquare(x, cb) {
        setTimeout(function () {
            cb(x * x)
        }, 100)
    }

    @PromiseDecorator
    asyncPromiseSquare(x, cb) {
        setTimeout(function () {
            cb(x * x)
        }, 100)
    }

    @CachePromise
    promiseSquare(x) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(x * x)
            }, 100)
        })
    }
}

module.exports = Test