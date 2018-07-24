import React from 'react';
import { isEmpty } from 'validate.js';
import PropTypes from 'prop-types';
import { getFieldValue, getFieldValidatorMessage } from './helpers';

class RenderField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderFieldByType = this.renderFieldByType.bind(this);
    this.validateField = this.validateField.bind(this);
    this.isFieldValid = true;
  }
  validateField(field, value) {
    const validatorMessage = getFieldValidatorMessage(field, value);
    const isValid = isEmpty(validatorMessage);
    if (isValid !== this.isFieldValid) {
      this.isFieldValid = isValid;
      this.props.onValidateStateChanged(field.key, isValid);
    }
    return validatorMessage;
  }

  renderFieldByType() {
    const {
      field, data, onChange, onFocus, onBlur, displayValidState, requiredPrefix
    } = this.props;
    const { validators, key, component } = field;
    const InputElement = component;
    const value = getFieldValue(field, data);
    const validatorMessage = this.validateField(field, value);
    const _validatorMessage = displayValidState ? validatorMessage : null;
    const isValid = isEmpty(validatorMessage);
    const isRequired = validators && validators.presence;
    return (
      <InputElement
        key={key}
        id={key}
        value={value}
        onFocus={() => onFocus({ key, value, isValid })}
        onChange={(newVal) => { onChange({ key, value: newVal, isValid }); }}
        onBlur={() => onBlur({ key, value, isValid })}
        displayValidState={displayValidState}
        isValid={isValid}
        validatorMessage={_validatorMessage}
        required={isRequired}
        requiredPrefix={requiredPrefix}
        field={field}
      />
    );
  }
  render() {
    return this.renderFieldByType();
  }
}
export default RenderField;

RenderField.propTypes = {
  onValidateStateChanged: PropTypes.func,
  field: PropTypes.object,
  data: PropTypes.any,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  displayValidState: PropTypes.bool,
  requiredPrefix: PropTypes.string,

};
RenderField.defaultProps = {
  data: {}
};

/* eslint func-names: 'off' */
/* eslint linebreak-style: 'off' */
/* eslint no-underscore-dangle: 'off' */
/* eslint react/require-default-props: 'off' */
/* eslint react/require-default-props: 'off' */
/* eslint react/default-props-match-prop-types: 'off' */
/* eslint react/forbid-prop-types: 'off' */
/* eslint react/jsx-filename-extension: 'off' */
