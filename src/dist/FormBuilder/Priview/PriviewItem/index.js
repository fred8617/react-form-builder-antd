'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _row = require('antd/es/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('antd/es/col');

var _col2 = _interopRequireDefault(_col);

var _inputNumber = require('antd/es/input-number');

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _input = require('antd/es/input');

var _input2 = _interopRequireDefault(_input);

var _select = require('antd/es/select');

var _select2 = _interopRequireDefault(_select);

var _radio = require('antd/es/radio');

var _radio2 = _interopRequireDefault(_radio);

var _checkbox = require('antd/es/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _form = require('antd/es/form');

var _form2 = _interopRequireDefault(_form);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

require('antd/es/row/style/css');

require('antd/es/col/style/css');

require('antd/es/input-number/style/css');

require('antd/es/input/style/css');

require('antd/es/select/style/css');

require('antd/es/radio/style/css');

require('antd/es/checkbox/style/css');

require('antd/es/form/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDnd = require('react-dnd');

var _Context = require('@/Context');

var _styled = require('@/styled');

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PRIVIEW_ELEMENT = 'PRIVIEW_ELEMENT';

var FormItem = _form2.default.Item;
var dropType = ['ELEMENT', PRIVIEW_ELEMENT];
var dragType = PRIVIEW_ELEMENT;

//放置目标处理集合
var target = {
	canDrop: function canDrop(props) {
		return true;
	},
	hover: function hover(props, monitor, component) {
		var dragItem = monitor.getItem().item;
		var hoverItem = props.item,
		    _props$state = props.state,
		    data = _props$state.data,
		    _props$state$actions = _props$state.actions,
		    setDownElement = _props$state$actions.setDownElement,
		    createElement = _props$state$actions.createElement,
		    moveElement = _props$state$actions.moveElement;

		setDownElement(monitor.getItem().item);
		var dragIndex = data.indexOf(dragItem);
		var hoverIndex = data.indexOf(hoverItem);
		if (dragIndex === hoverIndex) {
			return;
		}
		if (dragIndex === -1) {
			createElement(dragItem, hoverIndex);
			return;
		}
		// Determine rectangle on screen
		var hoverBoundingRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect();
		// Get vertical middle
		var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
		// Determine mouse position
		var clientOffset = monitor.getClientOffset();
		// Get pixels to the top
		var hoverClientY = clientOffset.y - hoverBoundingRect.top;
		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%
		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}
		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}
		// Time to actually perform the action
		moveElement(dragIndex, hoverIndex);
		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		//item.index = hoverIndex
	},
	drop: function drop(props, monitor, component) {
		var tp = monitor.getItemType();

		//const dragData=monitor.getItem().data;
	}
};

//拖拽目标处理集合
var source = {
	canDrag: function canDrag(props) {
		return true;
	},
	beginDrag: function beginDrag(props, monitor, component) {
		return props;
	}
};
var CheckboxGroup = _checkbox2.default.Group;
var RadioGroup = _radio2.default.Group;
var Option = _select2.default.Option;
var PriviewItem = (_dec = (0, _reactDnd.DropTarget)(dropType, target, function (connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
}), _dec2 = (0, _reactDnd.DragSource)(dragType, source, function (connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
		connectDragPreview: connect.dragPreview()
	};
}), (0, _Context.FormConsume)(_class = _dec(_class = _dec2(_class = function (_Component) {
	_inherits(PriviewItem, _Component);

	function PriviewItem() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, PriviewItem);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PriviewItem.__proto__ || Object.getPrototypeOf(PriviewItem)).call.apply(_ref, [this].concat(args))), _this), _this.getFormItem = function (item, props) {
			//根据元素类型获取控件
			var type = item.type;

			if (type === 'input') {
				return _react2.default.createElement(_input2.default, props);
			} else if (type === 'inputNumber') {
				return _react2.default.createElement(_inputNumber2.default, props);
			} else if (type === 'checkbox') {
				return _react2.default.createElement(_checkbox2.default, props);
			} else if (type === 'checkboxGroup') {
				return _react2.default.createElement(
					CheckboxGroup,
					_extends({}, props, { style: { width: '100%', lineHeight: '32px', position: 'relative', top: 5 } }),
					_react2.default.createElement(
						_row2.default,
						null,
						item.options.map(function (e) {
							return _react2.default.createElement(
								_col2.default,
								{
									title: e.label,
									span: 24 / item.optionRowShow,
									style: { whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }
								},
								_react2.default.createElement(
									_checkbox2.default,
									{ value: e.value },
									e.label
								)
							);
						})
					)
				);
			} else if (type === 'radio') {
				return _react2.default.createElement(
					RadioGroup,
					_extends({}, props, { style: { width: '100%', lineHeight: '32px', position: 'relative', top: 5 } }),
					_react2.default.createElement(
						_row2.default,
						null,
						item.options.map(function (e) {
							return _react2.default.createElement(
								_col2.default,
								{
									title: e.label,
									span: 24 / item.optionRowShow,
									style: { whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }
								},
								_react2.default.createElement(
									_radio2.default,
									{ value: e.value },
									e.label
								)
							);
						})
					)
				);
			} else if (type == 'select') {
				return _react2.default.createElement(
					_select2.default,
					{
						style: { width: 120 } },
					item.options.map(function (e) {
						return _react2.default.createElement(
							Option,
							{ value: e.value },
							e.label
						);
					})
				);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(PriviewItem, [{
		key: 'render',
		value: function render() {
			console.log('PriviewItem render');
			var _props = this.props,
			    _props$state$actions2 = _props.state.actions,
			    editShow = _props$state$actions2.editShow,
			    deleteItem = _props$state$actions2.deleteItem,
			    item = _props.item,
			    name = _props.item.name,
			    connectDropTarget = _props.connectDropTarget,
			    connectDragSource = _props.connectDragSource,
			    children = _props.children,
			    design = _props.design,
			    _props$form = _props.form,
			    getFieldDecorator = _props$form.getFieldDecorator,
			    getFieldProps = _props$form.getFieldProps;

			var labelStyle = {
				cursor: design ? 'move' : null,
				display: 'inline-block'
			};
			var formItemLayout = {
				labelCol: { span: 10 },
				wrapperCol: { span: 14 }
			};
			return connectDragSource && connectDropTarget && connectDropTarget(connectDragSource(_react2.default.createElement(
				'div',
				{ style: { cursor: 'move' } },
				_react2.default.createElement(
					'style',
					null,
					'\n\t\t\t\t\t\t\t\t\t\t.ant-form-item-no-colon .ant-form-item-label label:after{\n\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t.editor{\n\t\t\t\t\t\t\t\t\t\t\theight:200px;\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t.editor-main{\n\t\t\t\t\t\t\t\t\t\t\theight:100px\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t.ant-drawer-content-wrapper{\n\t\t\t\t\t\t\t\t\t\t\toverflow:auto\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t'
				),
				_react2.default.createElement(
					FormItem,
					_extends({}, formItemLayout, {
						colon: true,
						label: _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: item.label }, style: labelStyle })
					}),
					_react2.default.createElement(
						_row2.default,
						{ gutter: 5 },
						_react2.default.createElement(
							_col2.default,
							{ span: 20 },
							this.getFormItem(item, getFieldProps(item.fieldName || 'invalidField', {
								force: true,
								rules: [{
									required: item.required,
									message: item.requiredMessage
								}]
							}))
						),
						_react2.default.createElement(
							_col2.default,
							{ span: 2 },
							_react2.default.createElement(_styled.CursorIcon, {
								type: 'edit',
								onClick: function onClick(e) {
									return editShow(item);
								}
							})
						),
						_react2.default.createElement(
							_col2.default,
							{ span: 2 },
							_react2.default.createElement(_styled.CursorIcon, {
								type: 'delete',
								onClick: function onClick(e) {
									return deleteItem(item);
								}
							})
						)
					)
				)
			)));
		}
	}]);

	return PriviewItem;
}(_react.Component)) || _class) || _class) || _class);
exports.default = PriviewItem;