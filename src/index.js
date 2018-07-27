import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import RenderField from './RenderField';
import { getFieldValue } from './helpers';

class DocForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changedFields: {},
      focusFields: {},
      blurFields: {},
      unValidFields: [],
    };
    this.renderFields = this.renderFields.bind(this);
    this.renderField = this.renderField.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.focusNext = this.focusNext.bind(this);
    this.onChange = this.onChange.bind(this);
    this.enableValidateField = this.enableValidateField.bind(this);
    this.onValidateStateChanged = this.onValidateStateChanged.bind(this);
    this.getAllPerviousFields = this.getAllPerviousFields.bind(this);
    this.onRef = this.onRef.bind(this);
    this.fieldsInitialValue = {};
    this.inputsRef = {};
  }

  onChange(res) {
    const {
      key, value, isValid, resParameters
    } = res;
    const { changedFields } = this.state;
    let _changedFields = { ...changedFields };
    const { onChange, showSkippingFieldsWarnings } = this.props;
    if (!_changedFields[key]) {
      _changedFields[key] = true;
      if (showSkippingFieldsWarnings) {
        _changedFields = { ..._changedFields, ...this.getAllPerviousFields(key) };
      }
      this.setState({ changedFields: _changedFields });
    }
    const initialValue = this.fieldsInitialValue[key];
    const updateData = { ...this.props.data, [key]: value };
    onChange({
      key, value, isValid, initialValue, updateData, resParameters
    });
  }

  onFocus(res) {
    const {
      key, value, isValid, resParameters
    } = res;
    const { focusFields } = this.state;
    const { onFocus, showSkippingFieldsWarnings } = this.props;
    let _focusFields = { ...focusFields };
    if (!_focusFields[key]) {
      _focusFields[key] = true;
      if (showSkippingFieldsWarnings) {
        _focusFields = { ..._focusFields, ...this.getAllPerviousFields(key) };
      }
      this.setState({ focusFields: _focusFields });
    }
    if (this.fieldsInitialValue[key] === undefined) {
      this.fieldsInitialValue[key] = value;
    }
    const initialValue = this.fieldsInitialValue[key];
    if (onFocus) {
      onFocus({
        key, value, isValid, initialValue, resParameters
      });
    }
  }

  onBlur(res) {
    const {
      key, value, isValid, resParameters
    } = res;
    const { blurFields } = this.state;
    let _blurFields = { ...blurFields };
    const {
      onBlur, showSkippingFieldsWarnings
    } = this.props;
    if (!blurFields[key]) {
      _blurFields[key] = true;
      if (showSkippingFieldsWarnings) {
        _blurFields = { ..._blurFields, ...this.getAllPerviousFields(key) };
      }
      this.setState({ blurFields: _blurFields });
    }
    const initialValue = this.fieldsInitialValue[key];
    if (onBlur) {
      onBlur({
        key, value, isValid, initialValue, resParameters
      });
    }
  }


  onValidateStateChanged(fieldKey, isValid) {
    let { unValidFields } = this.state;
    const { onValidateStateChanged } = this.props;
    if (isValid) {
      unValidFields = unValidFields.filter(field => field !== fieldKey);
      this.setState({ unValidFields }, () => {
        if (onValidateStateChanged) {
          onValidateStateChanged({ unValidFields, isValid: unValidFields.length < 1 });
        }
      });
    } else {
      unValidFields.push(fieldKey);
      this.setState({ unValidFields }, () => {
        if (onValidateStateChanged) {
          onValidateStateChanged({ unValidFields, isValid: false });
        }
      });
    }
  }

  onRef(ref, position) {
    this.inputsRef[position] = ref;
  }

  getAllPerviousFields(key) {
    const { fields } = this.props;
    const perviousFields = {};
    let stopProcess = false;
    let keyToCheck = 0;
    while (!stopProcess) {
      if (fields[keyToCheck].key === key) {
        stopProcess = true;
      } else {
        perviousFields[fields[keyToCheck].key] = true;
      }
      keyToCheck += 1;
    }
    return perviousFields;
  }

  focusNext(key, position) {
    const {
      enableOpenPickerOnFocusNext, focusNextOnlyIfEmpty, data, fields
    } = this.props;
    const nextField = position + 1;
    if (this.inputsRef[nextField] &&
          (this.inputsRef[nextField].focus || this.inputsRef[nextField].openPicker)
    ) {
      let enabledNext = true;
      if (focusNextOnlyIfEmpty) {
        const nextFieldValue = getFieldValue(fields[nextField], data);
        enabledNext = isEmpty(nextFieldValue);
      }
      if (enabledNext && this.inputsRef[nextField].focus) {
        this.inputsRef[nextField].focus();
      } else if (enabledNext && enableOpenPickerOnFocusNext) {
        this.inputsRef[nextField].openPicker();
      }
    } else if (this.props.fields.length >= (nextField + 1)) {
      console.warn('react-cross-form - you enabled focusNext but ref/ref.focus() didn\'t found, check the onRef on the next field', { fieldKey: key });
    }
  }

  enableValidateField(field) {
    const { validateType } = this.props;
    const { focusFields, blurFields, changedFields } = this.state;
    let showWarnings = false;
    if (validateType === 'none') {
      showWarnings = false;
    } else if (validateType === 'all') {
      showWarnings = true;
    } else if (validateType === 'onFocus') {
      showWarnings = focusFields[field.key];
    } else if (validateType === 'onBlur') {
      showWarnings = blurFields[field.key];
    } else if (validateType === 'onChange') {
      showWarnings = changedFields[field.key];
    }
    return showWarnings;
  }

  renderField(field, index) {
    const { data, requiredPrefix, disabledAll } = this.props;
    return (
      <RenderField
        onRef={this.onRef}
        position={index}
        key={field.key}
        field={field}
        data={data}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onValidateStateChanged={this.onValidateStateChanged}
        showWarnings={this.enableValidateField(field)}
        requiredPrefix={requiredPrefix}
        disabledAll={disabledAll}
        focusNext={this.focusNext}
      />
    );
  }

  renderFields() {
    const { fields } = this.props;
    return fields.map((field, index) => this.renderField(field, index));
  }

  render() {
    return this.renderFields();
  }
}

DocForm.propTypes = {
  data: PropTypes.object, // {firstName: 'David', age: 35}
  fields: PropTypes.PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired, // firstName
    label: PropTypes.string.isRequired, // i18n('firstName')
    component: PropTypes.any.isRequired, // TextInput
    required: PropTypes.bool, // true
    disabled: PropTypes.bool, // false
    formatter: PropTypes.func, // () => {field , documentData}
    validators: PropTypes.object, // { presence: true, email: true } // https://validatejs.org/#validators,
    customValidation: PropTypes.function, // { field, value, data } need to return array of string
    placeholder: PropTypes.string
  })),
  validateType: PropTypes.oneOf(['none', 'all', 'onFocus', 'onBlur', 'onChange']),
  onChange: PropTypes.func.isRequired, // {key, value,isValid, initialValue, updateData, info}
  onFocus: PropTypes.func, // () => {key, value, isValid, initialValue, info}
  onBlur: PropTypes.func, // () => {key, value, isValid, initialValue, info}
  onValidateStateChanged: PropTypes.func, // () => {unValidFields, isValid}
  requiredPrefix: PropTypes.string, // *
  disabledAll: PropTypes.bool,
  focusNext: PropTypes.bool,
  enableOpenPickerOnFocusNext: PropTypes.bool,
  focusNextOnlyIfEmpty: PropTypes.bool,
  showSkippingFieldsWarnings: PropTypes.bool
};

DocForm.defaultProps = {
  data: {},
  fields: [],
  validateType: 'all',
  requiredPrefix: '*',
  disabledAll: false,
  onChange: () => console.warn('missing onChange')
};


export default DocForm;

/* eslint func-names: 'off' */
/* eslint linebreak-style: 'off' */
/* eslint no-underscore-dangle: 'off' */
/* eslint react/require-default-props: 'off' */
/* eslint react/require-default-props: 'off' */
/* eslint react/default-props-match-prop-types: 'off' */
/* eslint react/forbid-prop-types: 'off' */
/* eslint react/jsx-filename-extension: 'off' */
