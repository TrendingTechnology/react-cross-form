import React from 'react';
import PropTypes from 'prop-types';
import RenderField from './RenderField';

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
    this.onChange = this.onChange.bind(this);
    this.enableValidateField = this.enableValidateField.bind(this);
    this.onValidateStateChanged = this.onValidateStateChanged.bind(this);
    this.fieldsInitialValue = {};
  }

  onChange(res) {
    const {
      key, value, isValid, resParameters
    } = res;
    const { changedFields } = this.state;
    if (!changedFields[key]) {
      changedFields[key] = true;
      this.setState({ changedFields });
    }
    const initialValue = this.fieldsInitialValue[key];
    const updateData = { ...this.props.data, [key]: value };
    this.props.onChange({
      key, value, isValid, initialValue, updateData, resParameters
    });
  }

  onFocus(res) {
    const {
      key, value, isValid, resParameters
    } = res;
    const { focusFields } = this.state;
    const { onFocus } = this.props;
    if (!focusFields[key]) {
      focusFields[key] = true;
      this.setState({ focusFields });
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
    const { onBlur } = this.props;
    if (!blurFields[key]) {
      blurFields[key] = true;
      this.setState({ blurFields });
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

  enableValidateField(field) {
    const { validateType } = this.props;
    const { focusFields, blurFields, changedFields } = this.state;
    let displayValidState = false;
    if (validateType === 'none') {
      displayValidState = false;
    } else if (validateType === 'all') {
      displayValidState = true;
    } else if (validateType === 'onFocus') {
      displayValidState = focusFields[field.key];
    } else if (validateType === 'onBlur') {
      displayValidState = blurFields[field.key];
    } else if (validateType === 'onChange') {
      displayValidState = changedFields[field.key];
    }
    return displayValidState;
  }

  renderField(field) {
    const { data, requiredPrefix, disabledAll } = this.props;
    return (
      <RenderField
        key={field.key}
        field={field}
        data={data}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onValidateStateChanged={this.onValidateStateChanged}
        displayValidState={this.enableValidateField(field)}
        toggleFileInclude={this.toggleFileInclude}
        requiredPrefix={requiredPrefix}
        disabledAll={disabledAll}
      />
    );
  }

  renderFields() {
    const { fields } = this.props;
    return fields.map(field => this.renderField(field));
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
  onChange: PropTypes.func.isRequired, // () => {key, value, isValid, initialValue, updateData, resParameters}
  onFocus: PropTypes.func, // () => {key, value, isValid, initialValue, resParameters}
  onBlur: PropTypes.func, // () => {key, value, isValid, initialValue, resParameters}
  onValidateStateChanged: PropTypes.func, // () => {unValidFields, isValid}
  requiredPrefix: PropTypes.string, // *
  disabledAll: PropTypes.bool
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
