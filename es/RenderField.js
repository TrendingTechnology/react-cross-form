'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _validate = require('validate.js');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
          displayValidState = _props.displayValidState;
      var validators = field.validators,
          key = field.key,
          component = field.component;

      var InputElement = component;
      var value = (0, _helpers.getFieldValue)(field, data);
      var validatorMessage = this.validateField(field, value);
      var _validatorMessage = displayValidState ? validatorMessage : null;
      var isValid = (0, _validate.isEmpty)(validatorMessage);
      var isRequired = validators && validators.presence;
      return _react2.default.createElement(InputElement, {
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
        required: isRequired,
        field: field
      });
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
  onValidateStateChanged: _propTypes2.default.func,
  field: _propTypes2.default.object,
  data: _propTypes2.default.any,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  displayValidState: _propTypes2.default.bool

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