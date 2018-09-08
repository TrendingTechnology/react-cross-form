'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildValidateJsObject = exports.getFieldValidatorMessage = exports.getFieldValue = undefined;

var _validate = require('validate.js');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFieldValue = exports.getFieldValue = function getFieldValue(field) {
  var documentData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var props = arguments[2];
  var formatter = field.formatter;

  var fieldValue = documentData[field.key];
  var value = formatter ? formatter({ field: field, documentData: documentData, props: props }) : fieldValue;
  return value;
};
var getFieldValidatorMessage = exports.getFieldValidatorMessage = function getFieldValidatorMessage(field, value) {
  var validators = field.validators;

  var _value = value === '' ? null : value;
  var message = null;
  if (validators) {
    message = _validate2.default.single(_value, validators);
  }
  return message;
};

/**
 * @function buildValidateJsObject
 * @param {obj} payload object with different validate options
 * @param {boolean} payload.required
 * @param {number} payload.min
 * @param {number} payload.max
 * @param {boolean} payload.isEmail
 * @param {boolean} payload.isNumber
 * @param {boolean} payload.isUrl
 * @param {boolean} payload.isDate
 * @param {date} payload.earliest
 * @param {date} payload.latest
 * This method rerun you a https://validatejs.org object
 */
var buildValidateJsObject = exports.buildValidateJsObject = function buildValidateJsObject() {
  var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var required = payload.required,
      min = payload.min,
      max = payload.max,
      isEmail = payload.isEmail,
      isNumber = payload.isNumber,
      isUrl = payload.isUrl,
      isDate = payload.isDate,
      earliest = payload.earliest,
      latest = payload.latest;

  var validators = {};

  if (required) {
    validators.presence = true;
  }

  if (!isNumber && (min || max)) {
    validators.length = {};
    if (min === max) {
      validators.length.is = min;
    } else {
      if (min) {
        validators.length.minimum = min;
      }
      if (max) {
        validators.length.minimum = max;
      }
    }
  }

  if (isEmail) {
    validators.email = true;
  }

  if (isDate || earliest || latest) {
    validators.datetime = true;
    if (earliest || latest) {
      validators.datetime = {};
      if (earliest) {
        validators.datetime.earliest = earliest;
      }
      if (latest) {
        validators.datetime.latest = latest;
      }
    }
  }

  if (isNumber) {
    validators.numericality = true;
    if (min || max) {
      validators.numericality = {};
      if (min) {
        validators.numericality.greaterThan = min;
      }
      if (max) {
        validators.numericality.lessThan = max;
      }
    }
  }

  if (isUrl) {
    validators.url = true;
  }

  return validators;
};
/* eslint func-names: 'off' */
/* eslint linebreak-style: 'off' */
/* eslint no-underscore-dangle: 'off' */