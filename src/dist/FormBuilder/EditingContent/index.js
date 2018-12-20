"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/drawer/style");

var _drawer = _interopRequireDefault(require("antd/es/drawer"));

require("antd/es/divider/style");

var _divider = _interopRequireDefault(require("antd/es/divider"));

require("antd/es/radio/style");

var _radio = _interopRequireDefault(require("antd/es/radio"));

var _react = _interopRequireWildcard(require("react"));

var _reactDraftWysiwyg = require("react-draft-wysiwyg");

require("react-draft-wysiwyg/dist/react-draft-wysiwyg.css");

var _draftJs = require("draft-js");

var _draftjsToHtml = _interopRequireDefault(require("draftjs-to-html"));

var _htmlToDraftjs = _interopRequireDefault(require("html-to-draftjs"));

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _styled = require("../../styled");

var _Context = require("../../Context");

var _LabelEditor = _interopRequireDefault(require("./LabelEditor"));

var _FieldNameInput = _interopRequireDefault(require("./FieldNameInput"));

var _RequiredCheckBox = _interopRequireDefault(require("./RequiredCheckBox"));

var _DataOptions = _interopRequireDefault(require("./DataOptions"));

var _OptionRowShow = _interopRequireDefault(require("./OptionRowShow"));

var _mobxReact = require("mobx-react");

var _dec, _class;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var RadioButton = _radio.default.Button;
var RadioGroup = _radio.default.Group;
var EditingContent = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = (0, _mobxReact.observer)(_class =
/*#__PURE__*/
function (_Component) {
  _inherits(EditingContent, _Component);

  function EditingContent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EditingContent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EditingContent)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      position: "right"
    };

    _this.positionChange = function (e) {
      _this.setState({
        position: e.target.value
      });
    };

    _this.onClose = function () {
      var _assertThisInitialize = _assertThisInitialized(_assertThisInitialized(_this)),
          store = _assertThisInitialize.props.store;

      store.editing = false;
    };

    return _this;
  }

  _createClass(EditingContent, [{
    key: "render",
    value: function render() {
      console.log("EditingContent render");
      var _this$props = this.props,
          form = _this$props.form,
          _this$props$store = _this$props.store,
          visible = _this$props$store.editing,
          type = _this$props$store.editingData.type,
          position = this.state.position,
          positionChange = this.positionChange,
          setGroupData = this.setGroupData,
          addGroupData = this.addGroupData,
          deleteGroupData = this.deleteGroupData;
      return _react.default.createElement(_drawer.default, {
        style: {
          background: "white"
        },
        onClose: this.onClose,
        mask: false,
        title: _react.default.createElement(RadioGroup, {
          onChange: positionChange,
          value: position
        }, _react.default.createElement(RadioButton, {
          value: "top"
        }, "top"), _react.default.createElement(RadioButton, {
          value: "right"
        }, "right"), _react.default.createElement(RadioButton, {
          value: "bottom"
        }, "bottom"), _react.default.createElement(RadioButton, {
          value: "left"
        }, "left")),
        width: 500,
        height: 350,
        visible: visible,
        placement: position
      }, _react.default.createElement(_divider.default, {
        orientation: "left"
      }, "\u4F20\u503C\u5B57\u6BB5"), _react.default.createElement(_FieldNameInput.default, null), _react.default.createElement(_divider.default, {
        orientation: "left"
      }, "\u663E\u793A\u5B57\u6BB5\u540D"), _react.default.createElement(_LabelEditor.default, null), _react.default.createElement(_divider.default, {
        orientation: "left"
      }, "\u662F\u5426\u5FC5\u586B"), _react.default.createElement(_styled.SpanLH32, null, _react.default.createElement(_RequiredCheckBox.default, {
        form: form
      })), type == "checkboxGroup" || type == "radio" || type == "select" ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_divider.default, {
        orientation: "left"
      }, "\u9009\u9879"), _react.default.createElement(_DataOptions.default, null), type == "checkboxGroup" || type == "radio" ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_divider.default, {
        orientation: "left"
      }, "\u6BCF\u884C\u5C55\u793A\u6570\u91CF"), _react.default.createElement(_OptionRowShow.default, null)) : void 0) : void 0);
    }
  }]);

  return EditingContent;
}(_react.Component)) || _class) || _class);
exports.default = EditingContent;