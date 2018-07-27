import React from 'react';
import { isEmpty } from 'validate.js';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { getFieldValue, getFieldValidatorMessage } from './helpers';

class RenderField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      validatorMessage: null
    };
    this.renderFieldByType = this.renderFieldByType.bind(this);
    this.validateField = this.validateField.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onRef = this.onRef.bind(this);
    this.isFieldValid = this.isFieldValid.bind(this);
    this.focusNext = this.focusNext.bind(this);
    this.lastIsFieldValid = true;
    this.lastValidatorMessage = null;
  }

  componentWillMount() {
    const { field, data } = this.props;
    const value = getFieldValue(field, data);
    this.validateField(field, value, data);
  }

  componentDidUpdate(prevProps) {
    const { field, data } = this.props;
    const lastValue = getFieldValue(field, prevProps.data);
    const newValue = getFieldValue(field, this.props.data);
    if (// Input value was changed or input config
      !isEqual(lastValue, newValue) ||
      !isEqual(field, prevProps.field)
    ) {
      this.validateField(field, newValue, data);
    }
  }

  onRef(ref) {
    const { onRef, field, position } = this.props;
    if (field.onRef) {
      field.onRef(ref, position);
    }
    onRef(ref, position);
  }

  onFocus(info) {
    const { field, data } = this.props;
    const { key } = field;
    const value = getFieldValue(field, data);
    const isValid = isEmpty(this.state.validatorMessage);
    this.props.onFocus({
      key, value, isValid, info
    });
  }

  onChange(value, info) {
    const { field } = this.props;
    const { key } = field;
    const isValid = isEmpty(this.state.validatorMessage);
    this.props.onChange({
      key, value, isValid, info
    });
  }

  onBlur(info) {
    const { field, data, position } = this.props;
    const { key } = field;
    const value = getFieldValue(field, data);
    const isValid = isEmpty(this.state.validatorMessage);
    this.props.onBlur({
      key, value, isValid, info
    }, position);
  }

  focusNext() {
    const { field, position } = this.props;
    const { key } = field;
    this.props.focusNext(key, position);
  }

  isFieldValid() {
    return isEmpty(this.state.validatorMessage);
  }


  validateField(field, value, data) {
    const validatorMessage = field.customValidation ? field.customValidation(field, value, data) : getFieldValidatorMessage(field, value);
    const isValid = isEmpty(validatorMessage);
    if (
      !isEqual(isValid, this.lastIsFieldValid) ||
      !isEqual(validatorMessage, this.lastValidatorMessage)
    ) {
      this.lastIsFieldValid = isValid;
      this.lastValidatorMessage = validatorMessage;
      this.props.onValidateStateChanged(field.key, isValid);
      this.setState({ validatorMessage });
    }
  }

  renderFieldByType() {
    const {
      field, data, showWarnings, requiredPrefix,
      disabledAll, focusNext
    } = this.props;
    const {
      validators, key, component, ...resField
    } = field;
    const InputElement = component;
    const value = getFieldValue(field, data);
    const isValid = this.isFieldValid();
    const isRequired = validators && validators.presence;
    return (
      <InputElement
        {...resField}
        onRef={this.onRef}
        key={key}
        id={key}
        value={value}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
        showWarnings={showWarnings}
        isValid={isValid}
        validatorMessage={this.state.validatorMessage}
        required={isRequired}
        requiredPrefix={requiredPrefix}
        disabled={field.disabled || disabledAll}
        focusNext={this.focusNext}
      />
    );
  }
  render() {
    return this.renderFieldByType();
  }
}
export default RenderField;

RenderField.propTypes = {
  onRef: PropTypes.func,
  position: PropTypes.number.isRequired,
  onValidateStateChanged: PropTypes.func,
  field: PropTypes.object,
  data: PropTypes.any,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  focusNext: PropTypes.func,
  showWarnings: PropTypes.bool,
  requiredPrefix: PropTypes.string,
  disabledAll: PropTypes.bool
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
