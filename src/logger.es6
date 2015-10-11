'use strict'


function Logger(prefix) {
    return function (target, name, descriptor) {
        let oldMethod = descriptor.value
        descriptor.value = function () {
            console.log(prefix + ' in:', arguments)

            var result = oldMethod.apply(this, arguments)

            console.log(prefix + ' out:', result)

            return result
        }
    }
}

module.exports = Logger