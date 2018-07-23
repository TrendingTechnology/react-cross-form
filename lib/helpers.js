'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFieldValidatorMessage = exports.getFieldValue = undefined;

var _validate = require('validate.js');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    message = _validate2.default.single(value, validators);
  }
  return message;
};