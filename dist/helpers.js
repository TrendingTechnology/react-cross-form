(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.helpers = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var getFieldValue = exports.getFieldValue = function getFieldValue(field) {
    var documentData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var formatter = field.formatter;
    var fieldValue = documentData[field.key];
    var value = formatter ? formatter({ field: field, documentData: documentData }) : fieldValue;
    return value;
  };
  var getFieldValidatorMessage = exports.getFieldValidatorMessage = function getFieldValidatorMessage(field, value) {
    var validators = field.validators;

    var message = null;
    if (validators) {
      message = validateJs.single(value, validators);
    }
    return message;
  };
});