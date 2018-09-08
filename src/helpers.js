import validateJs from 'validate.js';

export const getFieldValue = function (field, documentData = {}, props) {
  const { formatter } = field;
  const fieldValue = documentData[field.key];
  const value = formatter ? formatter({ field, documentData, props }) : fieldValue;
  return value;
};
export const getFieldValidatorMessage = function (field, value) {
  const { validators } = field;
  const _value = value === '' ? null : value;
  let message = null;
  if (validators) {
    message = validateJs.single(_value, validators);
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
export const buildValidateJsObject = function (payload = {}) {
  const {required, min, max, isEmail, isNumber, isUrl, isDate, earliest, latest} = payload
  const validators = {}

  if(required) { validators.presence = true }

  if(!isNumber && (min || max)) {
    validators.length = {};
    if(min === max) {
      validators.length.is = min
    }else{
      if(min) { validators.length.minimum = min }
      if(max) { validators.length.minimum = max }
    }
  }

  if(isEmail) { validators.email = true }

  if(isDate || earliest || latest) {
    validators.datetime = true;
    if(earliest || latest) {
      validators.datetime = {};
      if(earliest) { validators.datetime.earliest = earliest }
      if(latest) { validators.datetime.latest = latest }
    }
  }

  if(isNumber) {
    validators.numericality = true;
    if(min || max) {
      validators.numericality = {}
      if(min) { validators.numericality.greaterThan = min }
      if(max) { validators.numericality.lessThan = max }
    }
  }

  if(isUrl) { validators.url = true }

  return validators
}
/* eslint func-names: 'off' */
/* eslint linebreak-style: 'off' */
/* eslint no-underscore-dangle: 'off' */
