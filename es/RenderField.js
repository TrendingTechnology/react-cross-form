'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpers = require('./helpers');

var _validate = require('validate.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RenderField = function (_React$PureComponent) {
  _inherits(RenderField, _React$PureComponent);

  function RenderField(props) {
    _classCallCheck(this, RenderField);

    var _this = _possibleConstructorReturn(this, (RenderField.__proto__ || Object.getPrototypeOf(RenderField)).call(this, props));

    _this.renderFieldByType = _this.renderFieldByType.bind(_this);
    _this.validateField = _this.validateField.bind(_this);
    _this.isFieldValid = true;
    return _this;
  }

  _createClass(RenderField, [{
    key: 'validateField',
    value: function validateField(field, value) {
      var validatorMessage = (0, _helpers.getFieldValidatorMessage)(field, value);
      var isValid = (0, _validate.isEmpty)(validatorMessage);
      if (isValid !== this.isFieldValid) {
        this.isFieldValid = isValid;
        this.props.onValidateStateChanged(field.key, isValid);
      }
      return validatorMessage;
    }
  }, {
    key: 'renderFieldByType',
    value: function renderFieldByType() {
      var _props = this.props,
          field = _props.field,
          data = _props.data,
          _onChange = _props.onChange,
          _onFocus = _props.onFocus,
          _onBlur = _props.onBlur,
          displayValidState = _props.displayValidState,
          required = _props.required,
          fieldData = _props.fieldData,
          resProps = _objectWithoutProperties(_props, ['field', 'data', 'onChange', 'onFocus', 'onBlur', 'displayValidState', 'required', 'fieldData']);

      var InputElement = field.component;
      var key = field.key;
      var value = (0, _helpers.getFieldValue)(field, data, fieldData);
      var validatorMessage = this.validateField(field, value);
      var _validatorMessage = displayValidState ? validatorMessage : null;
      var isValid = (0, _validate.isEmpty)(validatorMessage);
      return _react2.default.createElement(InputElement, _extends({
        key: key,
        id: key,
        value: value,
        onFocus: function onFocus() {
          return _onFocus({ key: key, value: value, isValid: isValid });
        },
        onChange: function onChange(newVal) {
          _onChange({ key: key, value: newVal, isValid: isValid });
        },
        onBlur: function onBlur() {
          return _onBlur({ key: key, value: value, isValid: isValid });
        },
        displayValidState: displayValidState,
        isValid: isValid,
        validatorMessage: _validatorMessage,
        required: required,
        fieldData: fieldData
      }, resProps, field));
    }
  }, {
    key: 'render',
    value: function render() {
      return this.renderFieldByType();
    }
  }]);

  return RenderField;
}(_react2.default.PureComponent);

exports.default = RenderField;


RenderField.defaultProps = {
  data: {}
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

};