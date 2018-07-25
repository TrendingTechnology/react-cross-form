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

var _RenderField = require('./RenderField');

var _RenderField2 = _interopRequireDefault(_RenderField);

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
    _this.onChange = _this.onChange.bind(_this);
    _this.enableValidateField = _this.enableValidateField.bind(_this);
    _this.onValidateStateChanged = _this.onValidateStateChanged.bind(_this);
    _this.fieldsInitialValue = {};
    return _this;
  }

  _createClass(DocForm, [{
    key: 'onChange',
    value: function onChange(res) {
      var key = res.key,
          value = res.value,
          isValid = res.isValid,
          resParameters = res.resParameters;
      var changedFields = this.state.changedFields;

      if (!changedFields[key]) {
        changedFields[key] = true;
        this.setState({ changedFields: changedFields });
      }
      var initialValue = this.fieldsInitialValue[key];
      var updateData = _extends({}, this.props.data, _defineProperty({}, key, value));
      this.props.onChange({
        key: key, value: value, isValid: isValid, initialValue: initialValue, updateData: updateData, resParameters: resParameters
      });
    }
  }, {
    key: 'onFocus',
    value: function onFocus(res) {
      var key = res.key,
          value = res.value,
          isValid = res.isValid,
          resParameters = res.resParameters;
      var focusFields = this.state.focusFields;
      var onFocus = this.props.onFocus;

      if (!focusFields[key]) {
        focusFields[key] = true;
        this.setState({ focusFields: focusFields });
      }
      if (this.fieldsInitialValue[key] === undefined) {
        this.fieldsInitialValue[key] = value;
      }
      var initialValue = this.fieldsInitialValue[key];
      if (onFocus) {
        onFocus({
          key: key, value: value, isValid: isValid, initialValue: initialValue, resParameters: resParameters
        });
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur(res) {
      var key = res.key,
          value = res.value,
          isValid = res.isValid,
          resParameters = res.resParameters;
      var blurFields = this.state.blurFields;
      var onBlur = this.props.onBlur;

      if (!blurFields[key]) {
        blurFields[key] = true;
        this.setState({ blurFields: blurFields });
      }
      var initialValue = this.fieldsInitialValue[key];
      if (onBlur) {
        onBlur({
          key: key, value: value, isValid: isValid, initialValue: initialValue, resParameters: resParameters
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
    key: 'enableValidateField',
    value: function enableValidateField(field) {
      var validateType = this.props.validateType;
      var _state = this.state,
          focusFields = _state.focusFields,
          blurFields = _state.blurFields,
          changedFields = _state.changedFields;

      var displayValidState = false;
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
  }, {
    key: 'renderField',
    value: function renderField(field) {
      var _props = this.props,
          data = _props.data,
          requiredPrefix = _props.requiredPrefix,
          disabledAll = _props.disabledAll;

      return _react2.default.createElement(_RenderField2.default, {
        key: field.key,
        field: field,
        data: data,
        onChange: this.onChange,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onValidateStateChanged: this.onValidateStateChanged,
        displayValidState: this.enableValidateField(field),
        toggleFileInclude: this.toggleFileInclude,
        requiredPrefix: requiredPrefix,
        disabledAll: disabledAll
      });
    }
  }, {
    key: 'renderFields',
    value: function renderFields() {
      var _this2 = this;

      var fields = this.props.fields;

      return fields.map(function (field) {
        return _this2.renderField(field);
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
    component: _propTypes2.default.node.isRequired, // TextInput
    required: _propTypes2.default.bool, // true
    disabled: _propTypes2.default.bool, // false
    formatter: _propTypes2.default.func, // () => {field , documentData}
    validators: _propTypes2.default.object, // { presence: true, email: true } // https://validatejs.org/#validators,
    customValidation: _propTypes2.default.function, // { field, value, data } need to return array of string
    placeholder: _propTypes2.default.string
  })),
  validateType: _propTypes2.default.oneOf(['none', 'all', 'onFocus', 'onBlur', 'onChange']),
  onChange: _propTypes2.default.func.isRequired, // () => {key, value, isValid, initialValue, updateData, resParameters}
  onFocus: _propTypes2.default.func, // () => {key, value, isValid, initialValue, resParameters}
  onBlur: _propTypes2.default.func, // () => {key, value, isValid, initialValue, resParameters}
  onValidateStateChanged: _propTypes2.default.func, // () => {unValidFields, isValid}
  requiredPrefix: _propTypes2.default.string, // *
  disabledAll: _propTypes2.default.bool
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