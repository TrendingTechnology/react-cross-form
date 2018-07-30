'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _RenderField = require('./RenderField');

var _RenderField2 = _interopRequireDefault(_RenderField);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DocForm = function (_React$Component) {
  _inherits(DocForm, _React$Component);

  function DocForm(props) {
    _classCallCheck(this, DocForm);

    var _this = _possibleConstructorReturn(this, (DocForm.__proto__ || Object.getPrototypeOf(DocForm)).call(this, props));

    _this.state = {
      changedFields: {},
      focusFields: {},
      blurFields: {},
      unValidFields: []
    };
    _this.renderFields = _this.renderFields.bind(_this);
    _this.renderField = _this.renderField.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.focusNext = _this.focusNext.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.enableValidateField = _this.enableValidateField.bind(_this);
    _this.onValidateStateChanged = _this.onValidateStateChanged.bind(_this);
    _this.getAllPerviousFields = _this.getAllPerviousFields.bind(_this);
    _this.onRef = _this.onRef.bind(_this);
    _this.fieldsInitialValue = {};
    _this.inputsRef = {};
    return _this;
  }

  _createClass(DocForm, [{
    key: 'onChange',
    value: function onChange(res) {
      var key = res.key,
          value = res.value,
          isValid = res.isValid,
          info = res.info;
      var changedFields = this.state.changedFields;

      var _changedFields = _extends({}, changedFields);
      var _props = this.props,
          onChange = _props.onChange,
          showSkippingFieldsWarnings = _props.showSkippingFieldsWarnings;

      if (!_changedFields[key]) {
        _changedFields[key] = true;
        if (showSkippingFieldsWarnings) {
          _changedFields = _extends({}, _changedFields, this.getAllPerviousFields(key));
        }
        this.setState({ changedFields: _changedFields });
      }
      var initialValue = this.fieldsInitialValue[key];
      var updateData = _extends({}, this.props.data, _defineProperty({}, key, value));
      onChange({
        key: key, value: value, isValid: isValid, initialValue: initialValue, updateData: updateData, info: info
      });
    }
  }, {
    key: 'onFocus',
    value: function onFocus(res) {
      var key = res.key,
          value = res.value,
          isValid = res.isValid,
          info = res.info;
      var focusFields = this.state.focusFields;
      var _props2 = this.props,
          onFocus = _props2.onFocus,
          showSkippingFieldsWarnings = _props2.showSkippingFieldsWarnings;

      var _focusFields = _extends({}, focusFields);
      if (!_focusFields[key]) {
        _focusFields[key] = true;
        if (showSkippingFieldsWarnings) {
          _focusFields = _extends({}, _focusFields, this.getAllPerviousFields(key));
        }
        this.setState({ focusFields: _focusFields });
      }

      this.fieldsInitialValue[key] = value;

      var initialValue = this.fieldsInitialValue[key];
      if (onFocus) {
        onFocus({
          key: key, value: value, isValid: isValid, initialValue: initialValue, info: info
        });
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur(res) {
      var key = res.key,
          value = res.value,
          isValid = res.isValid,
          info = res.info;
      var blurFields = this.state.blurFields;

      var _blurFields = _extends({}, blurFields);
      var _props3 = this.props,
          onBlur = _props3.onBlur,
          showSkippingFieldsWarnings = _props3.showSkippingFieldsWarnings;

      if (!blurFields[key]) {
        _blurFields[key] = true;
        if (showSkippingFieldsWarnings) {
          _blurFields = _extends({}, _blurFields, this.getAllPerviousFields(key));
        }
        this.setState({ blurFields: _blurFields });
      }
      var initialValue = this.fieldsInitialValue[key];
      if (onBlur) {
        onBlur({
          key: key, value: value, isValid: isValid, initialValue: initialValue, info: info
        });
      }
    }
  }, {
    key: 'onValidateStateChanged',
    value: function onValidateStateChanged(fieldKey, isValid) {
      var unValidFields = this.state.unValidFields;
      var onValidateStateChanged = this.props.onValidateStateChanged;

      if (isValid) {
        unValidFields = unValidFields.filter(function (field) {
          return field !== fieldKey;
        });
        this.setState({ unValidFields: unValidFields }, function () {
          if (onValidateStateChanged) {
            onValidateStateChanged({ unValidFields: unValidFields, isValid: unValidFields.length < 1 });
          }
        });
      } else {
        unValidFields.push(fieldKey);
        this.setState({ unValidFields: unValidFields }, function () {
          if (onValidateStateChanged) {
            onValidateStateChanged({ unValidFields: unValidFields, isValid: false });
          }
        });
      }
    }
  }, {
    key: 'onRef',
    value: function onRef(ref, position) {
      this.inputsRef[position] = ref;
    }
  }, {
    key: 'getAllPerviousFields',
    value: function getAllPerviousFields(key) {
      var fields = this.props.fields;

      var perviousFields = {};
      var stopProcess = false;
      var keyToCheck = 0;
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
  }, {
    key: 'focusNext',
    value: function focusNext(key, position) {
      var _props4 = this.props,
          enableOpenPickerOnFocusNext = _props4.enableOpenPickerOnFocusNext,
          focusNextOnlyIfEmpty = _props4.focusNextOnlyIfEmpty,
          data = _props4.data,
          fields = _props4.fields;

      var nextField = position + 1;
      if (this.inputsRef[nextField] && (this.inputsRef[nextField].focus || this.inputsRef[nextField].openPicker)) {
        var enabledNext = true;
        if (focusNextOnlyIfEmpty) {
          var nextFieldValue = (0, _helpers.getFieldValue)(fields[nextField], data);
          enabledNext = (0, _isEmpty2.default)(nextFieldValue);
        }
        if (enabledNext && this.inputsRef[nextField].focus) {
          this.inputsRef[nextField].focus();
        } else if (enabledNext && enableOpenPickerOnFocusNext) {
          this.inputsRef[nextField].openPicker();
        }
      } else if (this.props.fields.length >= nextField + 1) {
        console.warn('react-cross-form - you enabled focusNext but ref/ref.focus() didn\'t found, check the onRef on the next field', { fieldKey: key });
      }
    }
  }, {
    key: 'enableValidateField',
    value: function enableValidateField(field) {
      var validateType = this.props.validateType;
      var _state = this.state,
          focusFields = _state.focusFields,
          blurFields = _state.blurFields,
          changedFields = _state.changedFields;

      var showWarnings = false;
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
  }, {
    key: 'renderField',
    value: function renderField(field, index) {
      var _props5 = this.props,
          data = _props5.data,
          requiredPrefix = _props5.requiredPrefix,
          disabledAll = _props5.disabledAll;

      return _react2.default.createElement(_RenderField2.default, {
        onRef: this.onRef,
        position: index,
        key: field.key,
        field: field,
        data: data,
        onChange: this.onChange,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onValidateStateChanged: this.onValidateStateChanged,
        showWarnings: this.enableValidateField(field),
        requiredPrefix: requiredPrefix,
        disabledAll: disabledAll,
        focusNext: this.focusNext
      });
    }
  }, {
    key: 'renderFields',
    value: function renderFields() {
      var _this2 = this;

      var fields = this.props.fields;

      return fields.map(function (field, index) {
        return _this2.renderField(field, index);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return this.renderFields();
    }
  }]);

  return DocForm;
}(_react2.default.Component);

DocForm.propTypes = process.env.NODE_ENV !== "production" ? {
  data: _propTypes2.default.object, // {firstName: 'David', age: 35}
  fields: _propTypes2.default.PropTypes.arrayOf(_propTypes2.default.shape({
    key: _propTypes2.default.string.isRequired, // firstName
    label: _propTypes2.default.string.isRequired, // i18n('firstName')
    component: _propTypes2.default.any.isRequired, // TextInput
    required: _propTypes2.default.bool, // true
    disabled: _propTypes2.default.bool, // false
    formatter: _propTypes2.default.func, // () => {field , documentData}
    validators: _propTypes2.default.object, // { presence: true, email: true } // https://validatejs.org/#validators,
    customValidation: _propTypes2.default.function, // { field, value, data } need to return array of string
    placeholder: _propTypes2.default.string
  })),
  validateType: _propTypes2.default.oneOf(['none', 'all', 'onFocus', 'onBlur', 'onChange']),
  onChange: _propTypes2.default.func.isRequired, // {key, value,isValid, initialValue, updateData, info}
  onFocus: _propTypes2.default.func, // () => {key, value, isValid, initialValue, info}
  onBlur: _propTypes2.default.func, // () => {key, value, isValid, initialValue, info}
  onValidateStateChanged: _propTypes2.default.func, // () => {unValidFields, isValid}
  requiredPrefix: _propTypes2.default.string, // *
  disabledAll: _propTypes2.default.bool,
  focusNext: _propTypes2.default.bool,
  enableOpenPickerOnFocusNext: _propTypes2.default.bool,
  focusNextOnlyIfEmpty: _propTypes2.default.bool,
  showSkippingFieldsWarnings: _propTypes2.default.bool
} : {};

DocForm.defaultProps = {
  data: {},
  fields: [],
  validateType: 'all',
  requiredPrefix: '*',
  disabledAll: false,
  onChange: function onChange() {
    return console.warn('missing onChange');
  }
};

exports.default = DocForm;

/* eslint func-names: 'off' */
/* eslint linebreak-style: 'off' */
/* eslint no-underscore-dangle: 'off' */
/* eslint react/require-default-props: 'off' */
/* eslint react/require-default-props: 'off' */
/* eslint react/default-props-match-prop-types: 'off' */
/* eslint react/forbid-prop-types: 'off' */
/* eslint react/jsx-filename-extension: 'off' */

module.exports = exports['default'];