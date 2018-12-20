"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

var _react = _interopRequireWildcard(require("react"));

var _mobxReact = require("mobx-react");

var _mobx = require("mobx");

var _styled = require("../../../styled");

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

var DataOptions = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = (0, _mobxReact.observer)(_class =
/*#__PURE__*/
function (_Component) {
  _inherits(DataOptions, _Component);

  function DataOptions() {
    _classCallCheck(this, DataOptions);

    return _possibleConstructorReturn(this, _getPrototypeOf(DataOptions).apply(this, arguments));
  }

  _createClass(DataOptions, [{
    key: "render",
    value: function render() {
      var _this$props$store = this.props.store,
          data = _this$props$store.editingData,
          options = _this$props$store.editingData.options,
          setGroupData = _this$props$store.setGroupData,
          addGroupData = _this$props$store.addGroupData,
          deleteGroupData = _this$props$store.deleteGroupData;
      return _react.default.createElement(_react.Fragment, null, options.map(function (e, i) {
        return _react.default.createElement(_styled.RowMB10, {
          gutter: 15
        }, _react.default.createElement(_col.default, {
          span: 10
        }, _react.default.createElement(_input.default, {
          onChange: function onChange(e) {
            return setGroupData(data, "options", i, "label", e.target.value);
          },
          value: e.label,
          placeHolder: "label"
        })), _react.default.createElement(_col.default, {
          span: 10
        }, _react.default.createElement(_input.default, {
          onChange: function onChange(e) {
            return setGroupData(data, "options", i, "value", e.target.value);
          },
          value: e.value,
          placeHolder: "value"
        })), _react.default.createElement(_col.default, {
          span: 2
        }, _react.default.createElement(_button.default, {
          icon: "plus",
          onClick: function onClick(e) {
            return addGroupData(data, "options", i, {
              label: "default",
              value: "default"
            });
          }
        })), _react.default.createElement(_col.default, {
          span: 2
        }, options && options.length > 1 ? _react.default.createElement(_button.default, {
          icon: "minus",
          onClick: function onClick(e) {
            return deleteGroupData(data, "options", i);
          }
        }) : void 0));
      }));
    }
  }]);

  return DataOptions;
}(_react.Component)) || _class) || _class);
exports.default = DataOptions;