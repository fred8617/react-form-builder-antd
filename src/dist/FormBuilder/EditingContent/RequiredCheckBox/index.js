"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

require("antd/es/checkbox/style");

var _checkbox = _interopRequireDefault(require("antd/es/checkbox"));

var _react = _interopRequireWildcard(require("react"));

var _mobxReact = require("mobx-react");

var _mobx = require("mobx");

var _dec, _class, _class2, _descriptor, _descriptor2;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var RequiredCheckBox = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = (0, _mobxReact.observer)(_class = (_class2 =
/*#__PURE__*/
function (_Component) {
  _inherits(RequiredCheckBox, _Component);

  function RequiredCheckBox() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RequiredCheckBox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RequiredCheckBox)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "requireChange", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "requiredMessageChange", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(RequiredCheckBox, [{
    key: "render",
    value: function render() {
      var _this$props$store$edi = this.props.store.editingData,
          required = _this$props$store$edi.required,
          requiredMessage = _this$props$store$edi.requiredMessage;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_checkbox.default, {
        checked: required,
        onChange: this.requireChange
      }, "\u5FC5\u586B"), required ? _react.default.createElement(_input.default, {
        value: requiredMessage,
        onChange: this.requiredMessageChange,
        placeholder: "\u8F93\u5165\u6821\u9A8C\u5FC5\u586B\u7684\u6807\u8BED",
        style: {
          width: 200
        }
      }) : void 0);
    }
  }]);

  return RequiredCheckBox;
}(_react.Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "requireChange", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (e) {
      var store = _this2.props.store;
      store.editingData.required = e.target.checked;
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "requiredMessageChange", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (e) {
      var _this3$props = _this3.props,
          store = _this3$props.store,
          data = _this3$props.store.editingData,
          form = _this3$props.form;
      store.editingData.requiredMessage = e.target.value; // debugger

      var fName = data.fieldName || "invalidField";

      if (!form.getFieldValue(fName)) {
        form.setFieldsValue(_defineProperty({}, fName, 1));
        form.setFieldsValue(_defineProperty({}, fName, ""));
        setTimeout(function () {
          form.validateFields();
        }, 1);
      }
    };
  }
})), _class2)) || _class) || _class);
exports.default = RequiredCheckBox;