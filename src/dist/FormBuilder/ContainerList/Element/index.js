"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Context = require("../../../Context");

var _reactDnd = require("react-dnd");

var _mobxReact = require("mobx-react");

var _mobx = require("mobx");

var _dec, _dec2, _class;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var type = "ELEMENT"; //拖拽目标处理集合

var source = {
  canDrag: function canDrag(props) {
    return true;
  },
  beginDrag: function beginDrag(props, monitor, component) {
    return props;
  }
};
var Element = (_dec = (0, _mobxReact.inject)('store'), _dec2 = (0, _reactDnd.DragSource)(type, source, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
  };
}), _dec(_class = (0, _mobxReact.observer)(_class = (0, _Context.FormConsume)(_class = _dec2(_class =
/*#__PURE__*/
function (_Component) {
  _inherits(Element, _Component);

  function Element() {
    _classCallCheck(this, Element);

    return _possibleConstructorReturn(this, _getPrototypeOf(Element).apply(this, arguments));
  }

  _createClass(Element, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          connectDragSource = _this$props.connectDragSource,
          item = _this$props.item,
          name = _this$props.item.name,
          addElement = _this$props.store.addElement;
      return connectDragSource && connectDragSource(_react.default.createElement("div", {
        onClick: function onClick(e) {
          return addElement(item);
        },
        style: {
          cursor: "pointer"
        }
      }, name));
    }
  }]);

  return Element;
}(_react.Component)) || _class) || _class) || _class) || _class);
exports.default = Element;