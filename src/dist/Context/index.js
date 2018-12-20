"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormConsume = exports.Provider = exports.setChangeField = exports.changField = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _createContext = (0, _react.createContext)({}),
    Pro = _createContext.Provider,
    Consumer = _createContext.Consumer;

var changField;
exports.changField = changField;

var setChangeField = function setChangeField(fieldName) {
  exports.changField = changField = fieldName;
};

exports.setChangeField = setChangeField;
var Provider = Pro;
exports.Provider = Provider;

var FormConsume = function FormConsume(Component) {
  return function (props) {
    return _react.default.createElement(Consumer, null, function (e) {
      return _react.default.createElement(Component, _extends({}, props, e));
    });
  };
};

exports.FormConsume = FormConsume;