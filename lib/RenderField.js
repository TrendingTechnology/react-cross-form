'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _validate = require('validate.js');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RenderField = function (_React$PureComponent) {
  _inherits(RenderField, _React$PureComponent);

  function RenderField(props) {
    _classCallCheck(this, RenderField);

    var _this = _possibleConstructorReturn(this, (RenderField.__proto__ || Object.getPrototypeOf(RenderField)).call(this, props));

    _this.state = {
      validatorMessage: null
    };
    _this.renderFieldByType = _this.renderFieldByType.bind(_this);
    _this.validateField = _this.validateField.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.onRef = _this.onRef.bind(_this);
    _this.isFieldValid = _this.isFieldValid.bind(_this);
    _this.focusNext = _this.focusNext.bind(_this);
    _this.onKeyPress = _this.onKeyPress.bind(_this);
    _this.lastIsFieldValid = true;
    _this.lastValidatorMessage = null;
    return _this;
  }

  _createClass(RenderField, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          field = _props.field,
          data = _props.data;

      var value = (0, _helpers.getFieldValue)(field, data);
      this.validateField(field, value, data);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props2 = this.props,
          field = _props2.field,
          data = _props2.data;

      var lastValue = (0, _helpers.getFieldValue)(field, prevProps.data);
      var newValue = (0, _helpers.getFieldValue)(field, this.props.data);
      if ( // Input value was changed or input config
      !(0, _isEqual2.default)(lastValue, newValue) || !(0, _isEqual2.default)(field, prevProps.field)) {
        this.validateField(field, newValue, data);
      }
    }
  }, {
    key: 'onRef',
    value: function onRef(ref) {
      var _props3 = this.props,
          onRef = _props3.onRef,
          field = _props3.field,
          position = _props3.position;

      if (field.onRef) {
        field.onRef(ref, position);
      }
      onRef(ref, position);
    }
  }, {
    key: 'onFocus',
    value: function onFocus(info) {
      var _props4 = this.props,
          field = _props4.field,
          data = _props4.data;
      var key = field.key;

      var value = (0, _helpers.getFieldValue)(field, data);
      var isValid = (0, _validate.isEmpty)(this.state.validatorMessage);
      this.props.onFocus({
        key: key, value: value, isValid: isValid, info: info
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(value, info) {
      var field = this.props.field;
      var key = field.key;

      var isValid = (0, _validate.isEmpty)(this.state.validatorMessage);
      this.props.onChange({
        key: key, value: value, isValid: isValid, info: info
      });
    }
  }, {
    key: 'onBlur',
    value: function onBlur(info) {
      var _props5 = this.props,
          field = _props5.field,
          data = _props5.data,
          position = _props5.position;
      var key = field.key;

      var value = (0, _helpers.getFieldValue)(field, data);
      var isValid = (0, _validate.isEmpty)(this.state.validatorMessage);
      this.props.onBlur({
        key: key, value: value, isValid: isValid, info: info
      }, position);
    }
  }, {
    key: 'onKeyPress',
    value: function onKeyPress(e) {
      if ((typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object' && e.key) {
        if (e.key === 'Enter') {
          this.focusNext();
        } else {
          console.error('react-cross-form - nextOnKeyPress methods need an onKeyPress, input event, https://reactjs.org/docs/events.html#keyboard-events ');
        }
      }
    }
  }, {
    key: 'focusNext',
    value: function focusNext() {
      var _props6 = this.props,
          field = _props6.field,
          position = _props6.position;
      var key = field.key;

      this.props.focusNext(key, position);
    }
  }, {
    key: 'isFieldValid',
    value: function isFieldValid() {
      return (0, _validate.isEmpty)(this.state.validatorMessage);
    }
  }, {
    key: 'validateField',
    value: function validateField(field, value, data) {
      var validatorMessage = field.customValidation ? field.customValidation(field, value, data) : (0, _helpers.getFieldValidatorMessage)(field, value);
      var isValid = (0, _validate.isEmpty)(validatorMessage);
      if (!(0, _isEqual2.default)(isValid, this.lastIsFieldValid) || !(0, _isEqual2.default)(validatorMessage, this.lastValidatorMessage)) {
        this.lastIsFieldValid = isValid;
        this.lastValidatorMessage = validatorMessage;
        this.props.onValidateStateChanged(field.key, isValid);
        this.setState({ validatorMessage: validatorMessage });
      }
    }
  }, {
    key: 'renderFieldByType',
    value: function renderFieldByType() {
      var _extends2;

      var _props7 = this.props,
          field = _props7.field,
          data = _props7.data,
          showWarnings = _props7.showWarnings,
          requiredPrefix = _props7.requiredPrefix,
          disabledAll = _props7.disabledAll;

      var validators = field.validators,
          key = field.key,
          component = field.component,
          options = field.options,
          label = field.label,
          placeholder = field.placeholder,
          resField = _objectWithoutProperties(field, ['validators', 'key', 'component', 'options', 'label', 'placeholder']);

      var InputElement = component;
      var value = (0, _helpers.getFieldValue)(field, data);
      var isValid = this.isFieldValid();
      var isRequired = validators && validators.presence;
      if (this.props.options && field.options) {
        console.warn('react-cross-form - it seem the parent pass an options and you pass options with field configuration, you can find field.options as fieldOptions');
      }
      var _required = isRequired && requiredPrefix ? requiredPrefix : "";
      return _react2.default.createElement(InputElement, _extends((_extends2 = {
        key: key,
        id: key
        // input attributes
        , value: value,
        disabled: field.disabled || disabledAll,
        label: '' + _required + label,
        placeholder: placeholder
        // events
        , onFocus: this.onFocus,
        onBlur: this.onBlur,
        onChange: this.onChange
        // callback that help to focus nextField
        , onRef: this.onRef,
        onKeyPress: this.onKeyPress,
        focusNext: this.focusNext
      }, _defineProperty(_extends2, 'onKeyPress', this.onKeyPress), _defineProperty(_extends2, 'showWarnings', showWarnings), _defineProperty(_extends2, 'isValid', isValid), _defineProperty(_extends2, 'validatorMessage', this.state.validatorMessage), _defineProperty(_extends2, 'required', isRequired), _defineProperty(_extends2, 'validateStatus', showWarnings ? isValid ? 'success' : "error" : null), _defineProperty(_extends2, 'options', this.props.options || options), _defineProperty(_extends2, 'fieldOptions', this.props.options ? options : null), _extends2), resField));
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


RenderField.propTypes = process.env.NODE_ENV !== "production" ? {
  onRef: _propTypes2.default.func,
  position: _propTypes2.default.number.isRequired,
  onValidateStateChanged: _propTypes2.default.func,
  field: _propTypes2.default.object,
  data: _propTypes2.default.any,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  focusNext: _propTypes2.default.func,
  showWarnings: _propTypes2.default.bool,
  requiredPrefix: _propTypes2.default.string,
  disabledAll: _propTypes2.default.bool
} : {};
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

module.exports = exports['default'];