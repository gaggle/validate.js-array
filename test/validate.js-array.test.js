"use strict";
var expect = require("must")
var validate = require("validate.js")
var validateArray = require("../")

validateArray.register(validate)

describe("validate.js-array", function () {
  describe("#register", function () {
    it("should register itself", function () {
      var module = {validators: {}}
      validateArray.register(module)
      expect(module.validators.array).to.be.a.function()
    })
  })

  describe("simple schema", function () {
    beforeEach(function () {
      this.schema = {"foo": {array: {bar: {presence: true}}}}
    })

    it("should validate", function () {
      var res = validate({foo: [{bar: "baz"}]}, this.schema)
      expect(res).to.be.undefined()
    })

    it("should return failure details", function () {
      var res = validate({foo: [{invalid: "data"}]}, this.schema)
      expect(res).to.be.object()
    })

    it("should allow empty root element", function () {
      var res = validate({foo: []}, this.schema)
      expect(res).to.be.undefined()
    })

    it("should fail if empty root element is required", function () {
      this.schema.foo.presence = true
      var res = validate({foo: []}, this.schema)
      expect(res).to.be.an.object()
    })
  })

  describe("async integration", function () {
    beforeEach(function () {
      this.schema = {"foo": {arrayAsync: {bar: {presence: true}}}}
    })

    it("should validate", function () {
      return validate.async({foo: [{bar: "baz"}]}, this.schema)
        .must.resolve.to.object()
    })

    it("should reject", function () {
      return validate.async({foo: [{invalid: "data"}]}, this.schema)
        .must.reject.to.object()
    })
  })
})
