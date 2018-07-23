import React from 'react';
import {getFieldValue, getFieldValidatorMessage} from './helpers';
import {isEmpty} from 'validate.js';

class RenderField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderFieldByType = this.renderFieldByType.bind(this)
    this.validateField = this.validateField.bind(this)
    this.isFieldValid = true;
  }
  validateField(field, value) {
    let validatorMessage = getFieldValidatorMessage(field, value)
    const isValid = isEmpty(validatorMessage)
    if(isValid !== this.isFieldValid) {
      this.isFieldValid = isValid;
      this.props.onValidateStateChanged(field.key, isValid)
    }
    return validatorMessage
  }

  renderFieldByType() {
    const {field, data, onChange, onFocus, onBlur, displayValidState, required, fieldData, ...resProps} = this.props
    const InputElement = field.component;
    const key = field.key;
    const value = getFieldValue(field, data, fieldData);
    const validatorMessage = this.validateField(field, value);
    const _validatorMessage = displayValidState ? validatorMessage : null;
    const isValid = isEmpty(validatorMessage)
    return (
      <InputElement
        key={key}
        id={key}
        value={value}
        onFocus={() => onFocus({key, value, isValid})}
        onChange={newVal => { onChange({key, value: newVal, isValid}) }}
        onBlur={() => onBlur({key, value, isValid})}
        displayValidState={displayValidState}
        isValid={isValid}
        validatorMessage={_validatorMessage}
        required={required}
        fieldData={fieldData}
        {...resProps}
        {...field}
      />
    )
  }
  render() {
    return this.renderFieldByType();
  }
}
export default RenderField;

RenderField.defaultProps = {
  data: {}
}
/*
RenderField.defaultProps = {
  onChange: () => {},
  onFocus: () => {},
  onActivateFinished: () => {},
  onDeactivateFinished: () => {},
  onPressForChangePointer: () => {},
  validate: null,
  label: 'objectId',
  displayKey: 'objectId',
  isShow: true,
  showInputsErr: false,
  objectId: null,
  value: null,
  source: null,
  errorText: null,
  requiredErrMes: null,
  helperText: null,
  isSecureTextEntry: false,
  required: false,
  disabled: false,
  autoFocus: false,
  pointer: null
};
RenderField.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'pointer',
    'boolean',
    'email',
    'checkBox',
    'MultiLineField',
    'password'
  ]).isRequired,
  objectId: PropTypes.string,
  onPressForChangePointer: PropTypes.func, // When user click on pointer field, this run with function for call back with data
  displayKey: PropTypes.string, // text to show for pointer field, default is objectId
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool
  ]),
  source: PropTypes.string,
  errorText: PropTypes.string,
  requiredErrMes: PropTypes.string,
  helperText: PropTypes.string,
  onChange: PropTypes.func,
  validate: PropTypes.func,
  isShow: PropTypes.bool,
  showInputsErr: PropTypes.bool,
  isSecureTextEntry: PropTypes.bool,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  onActivateFinished: PropTypes.func, // for Boolean only, run after Activate
  onDeactivateFinished: PropTypes.func, // for Boolean only, run after Deactivate
  pointer: PropTypes.objectOf({
    schemaName: PropTypes.string,
    dispalyKey: PropTypes.string,
    valueKey: PropTypes.string
  })
};
*/
