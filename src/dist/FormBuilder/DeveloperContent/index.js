"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/divider/style");

var _divider = _interopRequireDefault(require("antd/es/divider"));

require("antd/es/icon/style");

var _icon = _interopRequireDefault(require("antd/es/icon"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

require("antd/es/collapse/style");

var _collapse = _interopRequireDefault(require("antd/es/collapse"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

var _react = _interopRequireWildcard(require("react"));

var _Context = require("../../Context");

var _mobxReact = require("mobx-react");

var _UrlInput = _interopRequireDefault(require("./UrlInput"));

var _dec, _class;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Search = _input.default.Search;
var Panel = _collapse.default.Panel;
var FormItem = _form.default.Item;
var DeveloperContent = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = (0, _mobxReact.observer)(_class =
/*#__PURE__*/
function (_Component) {
  _inherits(DeveloperContent, _Component);

  function DeveloperContent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DeveloperContent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DeveloperContent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.saveFormDesign = function () {
      var _this$props = _this.props,
          getFieldValue = _this$props.form.getFieldValue,
          _this$props$store = _this$props.store,
          data = _this$props$store.data,
          submitUrl = _this$props$store.submitUrl,
          index = _this$props$store.index,
          onSave = _this$props.onSave;
      var param = {
        data: data,
        submitUrl: submitUrl,
        index: index
      };
      onSave === null || onSave === void 0 ? void 0 : onSave(param);
    };

    return _this;
  }

  _createClass(DeveloperContent, [{
    key: "render",
    // shouldComponentUpdate(nextProps){
    //   return (
    //     (this.props.changField===nextProps.changField)
    //   );
    // }
    value: function render() {
      var formItemLayout = {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 18
        }
      };
      var _this$props2 = this.props,
          form = _this$props2.form,
          developer = _this$props2.store.developer;
      console.log("DeveloperContent render");
      return _react.default.createElement(_collapse.default, {
        bordered: false
      }, _react.default.createElement(Panel, {
        style: {
          background: "white",
          border: "none"
        },
        showArrow: false,
        header: _react.default.createElement("div", null, _react.default.createElement(_divider.default, {
          orientation: "left"
        }, _react.default.createElement(_icon.default, {
          type: "setting"
        }), "\u8868\u5355\u9009\u9879")),
        key: "1"
      }, developer ? _react.default.createElement(FormItem, _extends({}, formItemLayout, {
        colon: true,
        label: "\u63D0\u4EA4\u7684url"
      }), _react.default.createElement(_UrlInput.default, {
        form: form
      })) : void 0, _react.default.createElement("div", {
        style: {
          textAlign: "center"
        }
      }, _react.default.createElement(_button.default, {
        onClick: this.saveFormDesign,
        type: "primary"
      }, "\u4FDD\u5B58\u8868\u5355")), _react.default.createElement(_divider.default, {
        style: {
          margin: "10px 0"
        }
      })));
    }
  }]);

  return DeveloperContent;
}(_react.Component)) || _class) || _class);
exports.default = DeveloperContent;