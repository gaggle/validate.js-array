# validate.js-array
[![Build Status](https://travis-ci.org/gaggle/validate.js-array.svg?branch=master)](https://travis-ci.org/gaggle/validate.js-array)
[![Coverage Status](https://coveralls.io/repos/github/gaggle/validate.js-array/badge.svg?branch=master)](https://coveralls.io/github/gaggle/validate.js-array?branch=master)

`array` validation plugin for [validate.js](http://validatejs.org).

Install:

    npm install gaggle/validate.js-array

Use:

    var validate = require("validate.js")
    require("validate.js-array").register()

    var schema = {"foo": {array: {bar: {presence: true}}}}
    validate({foo: [{bar: "baz"}]}, this.schema)
    // => undefined

    validate({foo: [{invalid: "data"}]}, this.schema)
    // => { foo: [ 'Foo element [{"invalid":"data"}] does not validate:
            [{"bar":["Bar can\'t be blank"]}]' ] }

