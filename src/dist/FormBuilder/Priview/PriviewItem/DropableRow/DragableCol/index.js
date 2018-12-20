"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/divider/style");

var _divider = _interopRequireDefault(require("antd/es/divider"));

require("antd/es/icon/style");

var _icon = _interopRequireDefault(require("antd/es/icon"));

var _react = _interopRequireWildcard(require("react"));

var _mobxReact = require("mobx-react");

var _mobx = require("mobx");

var _reactDnd = require("react-dnd");

var _index = _interopRequireDefault(require("../../index"));

var _styled = require("../../../../../styled");

var _reactDom = require("react-dom");

var _dec, _dec2, _class;

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

var PRIVIEW_ELEMENT = "PRIVIEW_ELEMENT";
var dragType = "COL";
var dropType = ["ELEMENT", PRIVIEW_ELEMENT, dragType]; //放置目标处理集合

var target = {
  canDrop: function canDrop(props) {
    return true;
  },
  hover: function hover(props, monitor, component) {},
  drop: function drop(props, monitor, component) {
    var _monitor$getItem = monitor.getItem(),
        dragItem = _monitor$getItem.item;

    var hoverItem = props.item,
        _props$store = props.store,
        createElement = _props$store.createElement,
        moveElement = _props$store.moveElement,
        setDownElement = _props$store.setDownElement,
        addColIntoRow = _props$store.addColIntoRow,
        data = _props$store.data,
        addItemInCol = _props$store.addItemInCol,
        parent = props.parent;
    console.log("hover", dragItem.type, hoverItem.type);
    var dragType = dragItem.type;
    var hoverType = hoverItem.type;

    if (dragType != 'col' && hoverType == 'col') {
      // console.log(hoverItem,parent,dragItem);
      addItemInCol(dragItem, hoverItem);
      return;
    } // setDownElement(dragItem)


    var dragIndex = data.indexOf(dragItem);
    var hoverIndex = data.indexOf(hoverItem); // if (dragIndex === hoverIndex) {
    // 	console.log(`=`);
    // 	return;
    // }
    // if (dragIndex === -1) {
    // 	console.log(`-1`);
    //   createElement(dragItem,hoverIndex);
    //   return;
    // }
    // Determine rectangle on screen

    var hoverBoundingRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect(); // Get vertical middle

    var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2; // Determine mouse position

    var clientOffset = monitor.getClientOffset(); // Get pixels to the top

    var hoverClientY = clientOffset.y - hoverBoundingRect.top; // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    } // Dragging upwards


    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    } // Time to actually perform the action
    // moveElement(dragIndex, hoverIndex)
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    //item.index = hoverIndex

  }
}; //拖拽目标处理集合

var source = {
  canDrag: function canDrag(props) {
    return true;
  },
  beginDrag: function beginDrag(props, monitor, component) {
    console.log(monitor.getItemType());
    return props;
  },
  endDrag: function endDrag(props) {
    console.log(props);
  }
};
var DragableCol = (_dec = (0, _reactDnd.DropTarget)(dropType, target, function (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}), _dec2 = (0, _reactDnd.DragSource)(dragType, source, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    monitor: monitor,
    connectDragPreview: connect.dragPreview()
  };
}), _dec(_class = _dec2(_class =
/*#__PURE__*/
function (_Component) {
  _inherits(DragableCol, _Component);

  function DragableCol() {
    _classCallCheck(this, DragableCol);

    return _possibleConstructorReturn(this, _getPrototypeOf(DragableCol).apply(this, arguments));
  }

  _createClass(DragableCol, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          connectDropTarget = _this$props.connectDropTarget,
          connectDragSource = _this$props.connectDragSource,
          item = _this$props.item,
          childrenGroup = _this$props.item.children,
          store = _this$props.store,
          design = _this$props.design,
          form = _this$props.form;
      var iconContainerWidth = 70;
      var moveContainerWidth = 25;
      var mainMargin = 10;
      var elementContainer = {
        margin: design ? "0 ".concat(mainMargin, "px") : null,
        width: design ? "calc( 100% - ".concat(iconContainerWidth + moveContainerWidth + mainMargin * 2, "px )") : "100%"
      };
      return _react.default.createElement(_col.default, null, connectDragSource && connectDropTarget && connectDropTarget(_react.default.createElement("div", {
        className: "priviewItem"
      }, design && connectDragSource(_react.default.createElement("div", {
        className: "move-container"
      }, _react.default.createElement(_icon.default, {
        style: {
          cursor: "move"
        },
        type: "drag"
      }))), _react.default.createElement("div", {
        className: "element-container",
        style: elementContainer
      }, design && childrenGroup.length == 0 ? _react.default.createElement(_styled.NoneElement, {
        style: {
          lineHeight: "31px",
          height: 39,
          marginBottom: 24
        }
      }, "\u5217\u5BB9\u5668\uFF0C\u8BF7\u52A0\u5165\u5143\u7D20") : childrenGroup.map(function (e, i) {
        return _react.default.createElement(_index.default, {
          parent: item,
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
          a: []
        });
      })), design ? _react.default.createElement("div", {
        className: "operation-container",
        style: {
          width: iconContainerWidth
        }
      }, _react.default.createElement(_styled.CursorIcon, {
        type: "edit",
        onClick: this.edit
      }), _react.default.createElement(_divider.default, {
        type: "vertical"
      }), _react.default.createElement(_styled.CursorIcon, {
        type: "delete",
        onClick: this.delete
      })) : void 0, _react.default.createElement("div", {
        style: {
          clear: "both"
        }
      }))));
    }
  }]);

  return DragableCol;
}(_react.Component)) || _class) || _class);
exports.default = DragableCol;