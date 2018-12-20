"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoneElement = exports.RowMB10 = exports.SpanLH32 = exports.HoverRow = exports.CursorIcon = void 0;

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/icon/style");

var _icon = _interopRequireDefault(require("antd/es/icon"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CursorIcon = (0, _styledComponents.default)(_icon.default).withConfig({
  displayName: "styled__CursorIcon",
  componentId: "sc-1agnv4t-0"
})(["cursor:pointer;"]);
exports.CursorIcon = CursorIcon;
var HoverRow = (0, _styledComponents.default)(_row.default).withConfig({
  displayName: "styled__HoverRow",
  componentId: "sc-1agnv4t-1"
})([":hover{border:1px dashed red;}"]);
exports.HoverRow = HoverRow;

var SpanLH32 = _styledComponents.default.span.withConfig({
  displayName: "styled__SpanLH32",
  componentId: "sc-1agnv4t-2"
})(["line-height:32px;"]);

exports.SpanLH32 = SpanLH32;
var RowMB10 = (0, _styledComponents.default)(_row.default).withConfig({
  displayName: "styled__RowMB10",
  componentId: "sc-1agnv4t-3"
})(["margin-bottom:10px;"]);
exports.RowMB10 = RowMB10;

var NoneElement = _styledComponents.default.div.withConfig({
  displayName: "styled__NoneElement",
  componentId: "sc-1agnv4t-4"
})(["height:100px;text-align:center;border:3px dashed #d3d3d3;color:#d3d3d3;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;font-size:20px;border-radius:5px;line-height:100px;"]);

exports.NoneElement = NoneElement;