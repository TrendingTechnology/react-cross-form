import validateJs from 'validate.js';

export const getFieldValue = function (field, documentData = {}) {
  const formatter = field.formatter;
  const fieldValue = documentData[field.key];
  const value = formatter ? formatter({ field, documentData }) : fieldValue;
  return value;
};
export const getFieldValidatorMessage = function (field, value) {
  const { validators } = field;
  let message = null;
  if (validators) {
    message = validateJs.single(value, validators);
  }
  return message;
};
