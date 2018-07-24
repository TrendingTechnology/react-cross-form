import validateJs from 'validate.js';

export const getFieldValue = function (field, documentData = {}) {
  const { formatter } = field;
  const fieldValue = documentData[field.key];
  const value = formatter ? formatter({ field, documentData }) : fieldValue;
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

/* eslint func-names: 'off' */
/* eslint linebreak-style: 'off' */
/* eslint no-underscore-dangle: 'off' */
