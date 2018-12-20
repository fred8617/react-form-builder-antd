"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireWildcard(require("react"));

var _Context = require("../../Context");

var _styled = require("../../styled");

var _reactDnd = require("react-dnd");

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _mobxReact = require("mobx-react");

var _mobx = require("mobx");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _PriviewItem = _interopRequireDefault(require("./PriviewItem"));

var _dec, _class;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//预览单个元素
var FormItem = _form.default.Item;
var type = ["ELEMENT"]; //放置目标处理集合

var target = {
  canDrop: function canDrop(props) {
    return props.store.data.length == 0;
  },
  drop: function drop(props, monitor, component) {
    var _monitor$getItem = monitor.getItem(),
        element = _monitor$getItem.item;

    var addElement = props.store.addElement;
    addElement(element);
  }
};
var Priview = (_dec = (0, _reactDnd.DropTarget)(type, target, function (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}), _dec(_class = (0, _mobxReact.observer)(_class =
/*#__PURE__*/
function (_Component) {
  _inherits(Priview, _Component);

  function Priview() {
    _classCallCheck(this, Priview);

    return _possibleConstructorReturn(this, _getPrototypeOf(Priview).apply(this, arguments));
  }

  _createClass(Priview, [{
    key: "render",
    value: function render() {
      console.log("Priview render");
      var _this$props = this.props,
          connectDropTarget = _this$props.connectDropTarget,
          store = _this$props.store,
          _this$props$store = _this$props.store,
          _this$props$store$edi = _this$props$store.editingData,
          _this$props$store$edi2 = _this$props$store$edi.required,
          required = _this$props$store$edi2 === void 0 ? false : _this$props$store$edi2,
          label = _this$props$store$edi.label,
          options = _this$props$store$edi.options,
          optionRowShow = _this$props$store$edi.optionRowShow,
          fieldName = _this$props$store$edi.fieldName,
          data = _this$props$store.data,
          length = _this$props$store.data.length,
          form = _this$props.form,
          design = _this$props.design;
      console.log("design", design);
      var a = [];
      options === null || options === void 0 ? void 0 : options.forEach(function (e) {
        return a.push(e.label);
      });
      return connectDropTarget && connectDropTarget(_react.default.createElement("div", null, _react.default.createElement(_form.default, null, length == 0 ? design && _react.default.createElement(_styled.NoneElement, null, "\u8BF7\u5728\u5143\u7D20\u680F\u6293\u53D6\u5143\u7D20\u6216\u76F4\u63A5\u70B9\u51FB\u5143\u7D20") : data.map(function (e, i) {
        return _react.default.createElement(_PriviewItem.default, {
          parent: data,
          design: design,
          key: "PriviewItem".concat(i),
          form: form,
          item: e,
          store: store,
          required: e.required,
          children: (0, _mobx.toJS)(e.children),
          label: e.label,
          options: (0, _mobx.toJS)(e.options),
          optionRowShow: e.optionRowShow,
          fieldName: e.fieldName,
          a: a
        });
      }))));
    }
  }]);

  return Priview;
}(_react.Component)) || _class) || _class);
exports.default = Priview;