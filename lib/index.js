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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var USE_ON_CHANGE_AND_BLUR = true;

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
    _this.onChangeAndBlur = _this.onChangeAndBlur.bind(_this);
    _this.enableValidateField = _this.enableValidateField.bind(_this);
    _this.onValidateStateChanged = _this.onValidateStateChanged.bind(_this);
    _this.getAllPerviousFields = _this.getAllPerviousFields.bind(_this);
    _this.onRef = _this.onRef.bind(_this);
    _this.getOtherFieldRefByKey = _this.getOtherFieldRefByKey.bind(_this);
    _this.onRefRenderField = _this.onRefRenderField.bind(_this);
    _this.handleChangedFieldsTracking = _this.handleChangedFieldsTracking.bind(_this);
    _this.handleFocusFieldTracking = _this.handleFocusFieldTracking.bind(_this);
    _this.handleBlurFieldTracking = _this.handleBlurFieldTracking.bind(_this);
    _this.fieldsInitialValue = {};
    _this.inputsRef = {};
    _this.renderFieldsRef = {};
    _this.inputPositionByKey = {};
    return _this;
  }
  // --- Tracking on all fields event, help us know when to show to user fields errors


  _createClass(DocForm, [{
    key: 'handleChangedFieldsTracking',
    value: function handleChangedFieldsTracking(key) {
      this.handleTrackingByKeyAndType(key, 'changedFields');
    }
  }, {
    key: 'handleFocusFieldTracking',
    value: function handleFocusFieldTracking(key) {
      this.handleTrackingByKeyAndType(key, 'focusFields');
    }
  }, {
    key: 'handleBlurFieldTracking',
    value: function handleBlurFieldTracking(key) {
      this.handleTrackingByKeyAndType(key, 'blurFields');
    }
  }, {
    key: 'handleTrackingByKeyAndType',
    value: function handleTrackingByKeyAndType(key, type) {
      var showSkippingFieldsWarnings = this.props.showSkippingFieldsWarnings;

      var updateTracking = _extends({}, this.state[type]);
      if (!updateTracking[key]) {
        updateTracking[key] = true;
        if (showSkippingFieldsWarnings) {
          updateTracking = _extends({}, updateTracking, this.getAllPerviousFields(key));
        }
        this.setState(_defineProperty({}, type, updateTracking));
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus(res) {
      var key = res.key,
          value = res.value,
          isValid = res.isValid,
          info = res.info;

      this.handleFocusFieldTracking(key);
      this.fieldsInitialValue[key] = value; // update the initial value
      if (this.props.onFocus) {
        this.props.onFocus({
          key: key, value: value, isValid: isValid, initialValue: value, info: info
        });
      }
    }
  }, {
    key: 'onChangeAndBlur',
    value: function onChangeAndBlur(res) {
      this.handleTrackingByKeyAndType(res.key, 'changedFields');
      this.handleTrackingByKeyAndType(res.key, 'blurFields');
      this.onChange(res, USE_ON_CHANGE_AND_BLUR);
    }
  }, {
    key: 'onChange',
    value: function onChange(res, useOnChangeAndBlur) {
      var key = res.key,
          value = res.value,
          isValid = res.isValid,
          info = res.info;

      this.handleChangedFieldsTracking(key);
      var initialValue = this.fieldsInitialValue[key];
      var updateData = _extends({}, this.props.data, _defineProperty({}, key, value));
      var payload = {
        key: key, value: value, isValid: isValid, initialValue: initialValue, updateData: updateData, info: info
      };
      if (useOnChangeAndBlur) {
        this.props.onChangeAndBlur(payload);
      } else {
        this.props.onChange(payload);
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur(res) {
      var key = res.key,
          value = res.value,
          isValid = res.isValid,
          info = res.info;

      this.handleBlurFieldTracking(key);
      var initialValue = this.fieldsInitialValue[key];
      if (this.props.onBlur) {
        this.props.onBlur({
          key: key, value: value, isValid: isValid, initialValue: initialValue, info: info
        });
      }
    }
  }, {
    key: 'onValidateStateChanged',
    value: function onValidateStateChanged(fieldKey, isValid) {
      // This will call from './RenderField'
      var unValidFields = [].concat(_toConsumableArray(this.state.unValidFields));
      var onValidateStateChanged = this.props.onValidateStateChanged;

      if (isValid) {
        // Remove valid field
        unValidFields = unValidFields.filter(function (field) {
          return field !== fieldKey;
        });
        this.setState({ unValidFields: unValidFields }, function () {
          if (onValidateStateChanged) {
            onValidateStateChanged({ unValidFields: unValidFields, isValid: !unValidFields.length });
          }
        });
      } else {
        // Add un valid field
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
    value: function onRef(ref, position, inputKey) {
      // We want to save all fields ref to let the focusNext option
      this.inputPositionByKey[inputKey] = position;
      this.inputsRef[position] = ref;
    }
  }, {
    key: 'getOtherFieldRefByKey',
    value: function getOtherFieldRefByKey(inputKey) {
      // Sometimes one field need to manipulate another field, with this he can
      var fieldPosition = this.inputPositionByKey[inputKey];
      return {
        input: this.inputsRef[fieldPosition],
        parent: this.renderFieldsRef[inputKey]
      };
    }
  }, {
    key: 'onRefRenderField',
    value: function onRefRenderField(ref) {
      // We want to pass on getOtherFieldRefByKey input ref and wrapper(RenderField) ref;
      if (ref && ref.props) {
        this.renderFieldsRef[ref.props.id] = ref;
      }
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
      var _props = this.props,
          enableOpenPickerOnFocusNext = _props.enableOpenPickerOnFocusNext,
          focusNextOnlyIfEmpty = _props.focusNextOnlyIfEmpty,
          data = _props.data,
          fields = _props.fields;

      var nextField = position + 1;
      var currentField = position;
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
      } else {
        if (this.props.fields.length >= nextField + 1) {
          console.warn('react-cross-form - you enabled focusNext but ref/ref.focus() didn\'t found, check the onRef on the next field', { fieldKey: key });
        }
        if (this.inputsRef[currentField]) {
          this.inputsRef[currentField].blur();
        }
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
    value: function renderField(field, index, isGroup) {
      var _props2 = this.props,
          data = _props2.data,
          requiredPrefix = _props2.requiredPrefix,
          disabledAll = _props2.disabledAll,
          fieldsOptions = _props2.fieldsOptions;

      var propsToPass = {
        id: field.key,
        onRefRenderField: this.onRefRenderField,
        onRef: this.onRef,
        position: index,
        key: field.key,
        field: field,
        data: data,
        onChange: this.onChange,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onChangeAndBlur: this.onChangeAndBlur,
        onValidateStateChanged: this.onValidateStateChanged,
        showWarnings: this.enableValidateField(field),
        requiredPrefix: requiredPrefix,
        disabledAll: disabledAll,
        focusNext: this.focusNext,
        options: fieldsOptions[field.key],
        getOtherFieldRefByKey: this.getOtherFieldRefByKey
      };
      if (isGroup) {
        return function () {
          var propsFromGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return _react2.default.createElement(_RenderField2.default, _extends({}, propsToPass, { propsFromGroup: propsFromGroup }));
        };
      }
      return _react2.default.createElement(_RenderField2.default, propsToPass);
    }
  }, {
    key: 'renderFields',
    value: function renderFields() {
      var _this2 = this;

      var _props3 = this.props,
          fields = _props3.fields,
          render = _props3.render;

      var position = 0;
      var _fields = void 0;
      if (render) {
        _fields = {};
        fields.forEach(function (field) {
          _fields[field.key] = _this2.renderField(field, position++);
        });
      } else {
        _fields = [];
        fields.forEach(function (field) {
          if (field.group) {
            var fieldGroup = {};
            field.group.forEach(function (childField) {
              fieldGroup[childField.key] = _this2.renderField(childField, position++, true);
            });
            var groupElement = _react2.default.createElement(field.component, _extends({ inputsGroup: fieldGroup }, field));
            _fields.push(groupElement);
          } else {
            _fields.push(_this2.renderField(field, position++));
          }
        });
      }
      return _fields;
    }
  }, {
    key: 'render',
    value: function render() {
      var render = this.props.render;

      if (render) {
        return render(this.renderFields());
      } else {
        return this.renderFields();
      }
    }
  }]);

  return DocForm;
}(_react2.default.Component);

DocForm.propTypes = process.env.NODE_ENV !== "production" ? {
  data: _propTypes2.default.object, // {firstName: 'David', age: 35}
  fields: _propTypes2.default.PropTypes.arrayOf(_propTypes2.default.shape({
    key: _propTypes2.default.string.isRequired, // firstName
    label: _propTypes2.default.string, // i18n('firstName')
    component: _propTypes2.default.any.isRequired, // TextInput
    required: _propTypes2.default.bool, // true
    disabled: _propTypes2.default.bool, // false
    formatter: _propTypes2.default.func, // () => {field , documentData}
    validators: _propTypes2.default.object, // { presence: true, email: true } // https://validatejs.org/#validators,
    customValidation: _propTypes2.default.function, // { field, value, data } need to return array of string
    placeholder: _propTypes2.default.string
  })),
  validateType: _propTypes2.default.oneOf(['none', 'all', 'onFocus', 'onBlur', 'onChange']),
  onChange: _propTypes2.default.func.isRequired, // {key, value,isValid, initialValue, updateData, info},
  onChangeAndBlur: _propTypes2.default.func, // {key, value,isValid, initialValue, updateData, info}
  onFocus: _propTypes2.default.func, // () => {key, value, isValid, initialValue, info}
  onBlur: _propTypes2.default.func, // () => {key, value, isValid, initialValue, info}
  onValidateStateChanged: _propTypes2.default.func, // () => {unValidFields, isValid}
  requiredPrefix: _propTypes2.default.string, // *
  disabledAll: _propTypes2.default.bool,
  enableOpenPickerOnFocusNext: _propTypes2.default.bool,
  focusNextOnlyIfEmpty: _propTypes2.default.bool,
  showSkippingFieldsWarnings: _propTypes2.default.bool,
  fieldsOptions: _propTypes2.default.object // you can pass your inputs an object with options, key for each data is field.key
} : {};

DocForm.defaultProps = {
  data: {},
  fieldsOptions: {},
  fields: [],
  validateType: 'all',
  requiredPrefix: '*',
  disabledAll: false,
  onChange: function onChange() {
    return console.warn('react-cross-form - missing onChange');
  },
  onChangeAndBlur: function onChangeAndBlur() {
    return console.log('react-cross-form -missing onChangeAndBlur');
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