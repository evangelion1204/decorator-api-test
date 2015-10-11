'use strict'

function CachePromise(target, name, descriptor) {
    let oldMethod = descriptor.value;

    descriptor.value = function () {
        let functionArguments = arguments

        if (typeof CachePromise.Cache[name] !== 'undefined') {
            return Promise.resolve(CachePromise.Cache[name])
        }

        return oldMethod.apply(this, functionArguments).then(function (result) {
            return new Promise(function (resolve, reject) {
                CachePromise.Cache[name] = result
                resolve(result)
            });
        })
    }
}

CachePromise.Cache = {}

module.exports = CachePromise