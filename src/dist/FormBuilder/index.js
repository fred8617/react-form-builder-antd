"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormBuilderNoBackend = exports.default = void 0;

require("antd/es/affix/style");

var _affix = _interopRequireDefault(require("antd/es/affix"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireWildcard(require("react"));

var _reactDndHtml5Backend = _interopRequireDefault(require("react-dnd-html5-backend"));

var _reactDnd = require("react-dnd");

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _mobxReact = require("mobx-react");

var _Store = _interopRequireDefault(require("../Store"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Priview = _interopRequireDefault(require("./Priview"));

var _ElementList = _interopRequireDefault(require("./ElementList"));

var _ContainerList = _interopRequireDefault(require("./ContainerList"));

var _EditingContent = _interopRequireDefault(require("./EditingContent"));

var _DeveloperContent = _interopRequireDefault(require("./DeveloperContent"));

var _dec, _class;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//开发者视图
var store = new _Store.default();

var PrivicwContainer = _styledComponents.default.div.withConfig({
  displayName: "FormBuilder__PrivicwContainer",
  componentId: "sc-1q5pr65-0"
})(["padding:10px;min-height:200px;float:left;width:", ";", ""], function (props) {
  return props.simple ? "calc( 100% - 158px)" : "calc( 100% - 316px)";
}, ''
/* @media screen and (max-width: 1900px) {
width: 600px;
}
@media screen and (max-width: 1024px) {
width: 500px;
} */
);

var ElementListContainer = _styledComponents.default.div.withConfig({
  displayName: "FormBuilder__ElementListContainer",
  componentId: "sc-1q5pr65-1"
})(["float:left;width:150px;margin-left:8px;"]);

var ContainerListContainer = _styledComponents.default.div.withConfig({
  displayName: "FormBuilder__ContainerListContainer",
  componentId: "sc-1q5pr65-2"
})(["", ""], ''
/* margin-left: 5px; */
);

var FormBuilderVersion = (_dec = _form.default.create({
  onValuesChange: function onValuesChange(props, fields) {
    store.editField = Object.keys(fields)[0];
  }
}), _dec(_class = (0, _mobxReact.observer)(_class =
/*#__PURE__*/
function (_Component) {
  _inherits(FormBuilderVersion, _Component);

  function FormBuilderVersion() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FormBuilderVersion);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FormBuilderVersion)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isInit: false // componentDidMount(){
      //   console.log(`didmount`);
      //   if(this.props.defaultValues){
      //     debugger
      //     this.props.form.setFieldsValue(this.props.defaultValues)
      //   }
      // }

    };
    return _this;
  }

  _createClass(FormBuilderVersion, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          design = _this$props.design,
          priviewStyle = _this$props.priviewStyle,
          style = _this$props.style,
          formLayout = _this$props.formLayout,
          onSave = _this$props.onSave,
          defaultValues = _this$props.defaultValues,
          elementStyle = _this$props.elementStyle; // store?.editingData?.required

      return _react.default.createElement(_mobxReact.Provider, {
        store: store
      }, _react.default.createElement(_react.Fragment, null, _react.default.createElement("style", null, "\n          p,ol{\n            margin:0\n          }\n          "), _react.default.createElement("div", {
        style: style
      }, _react.default.createElement(PrivicwContainer, {
        simple: store.simple,
        style: _objectSpread({
          width: !design ? "100%" : null
        }, priviewStyle)
      }, design ? _react.default.createElement(_affix.default, {
        style: {
          position: 'relative',
          top: -11
        }
      }, _react.default.createElement(_DeveloperContent.default, {
        onSave: onSave,
        form: this.props.form
      })) : void 0, _react.default.createElement(_Priview.default, {
        defaultValues: defaultValues,
        form: this.props.form,
        store: store,
        design: design
      })), design ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(ElementListContainer, {
        style: elementStyle
      }, _react.default.createElement(_affix.default, null, _react.default.createElement(_ElementList.default, null))), !store.simple ? _react.default.createElement(ElementListContainer, {
        style: elementStyle
      }, _react.default.createElement(_affix.default, null, _react.default.createElement(_ContainerList.default, null))) : void 0) : void 0), _react.default.createElement("div", {
        style: {
          clear: "both"
        }
      }), design ? _react.default.createElement(_EditingContent.default, {
        form: this.props.form
      }) : void 0));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref, state) {
      var _ref$data = _ref.data,
          data = _ref$data === void 0 ? {} : _ref$data,
          restProps = _objectWithoutProperties(_ref, ["data"]);

      // console.log(restProps.form.validateFields());
      if (!state.isInit) {
        store.init(_objectSpread({
          data: data
        }, restProps));
      }

      console.log("getDerivedStateFromProps");
      return {
        isInit: true
      };
    }
  }]);

  return FormBuilderVersion;
}(_react.Component)) || _class) || _class);
var FormBuilder = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend.default, {
  window: window
})(FormBuilderVersion);
exports.default = FormBuilder;
var FormBuilderNoBackend = FormBuilderVersion;
exports.FormBuilderNoBackend = FormBuilderNoBackend;