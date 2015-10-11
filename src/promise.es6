'use strict'

function PromiseDecorator(target, name, descriptor) {
    let oldMethod = descriptor.value;

    descriptor.value = function () {
        var functionArguments = arguments
        return new Promise(function (resolve, reject) {
            let newArguments = [...functionArguments, resolve]
            oldMethod.apply(this, newArguments)
        });
    }
}

module.exports = PromiseDecorator