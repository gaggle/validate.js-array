"use strict";
var _ = require("lodash")
var s = require("util").format

exports.register = function (module) {
  if (!module) module = require("validate.js")

  var val = function (value, options, key, attributes) {
    var validateElement = function (element) {
      return module(element, options)
    }
    var validations = _.chain(value).map(validateElement).filter().value()
    if (_.isEmpty(validations)) return
    return s("element %j does not validate: %j", value, validations)
  }

  var async = function (args) {
    args = arguments
    return new module.Promise(function (resolve, reject) {
      var result = val.apply(this, args)
      resolve(result)
    })
  }

  module.validators.array = val
  module.validators.arrayAsync = async
}
