"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mobx = require("mobx");

var _draftJs = require("draft-js");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var Store = (_class =
/*#__PURE__*/
function () {
  function Store() {
    var _this = this;

    _classCallCheck(this, Store);

    this.editField = void 0;
    this.form = void 0;
    this.index = 0;

    _initializerDefineProperty(this, "simple", _descriptor, this);

    _initializerDefineProperty(this, "editorState", _descriptor2, this);

    _initializerDefineProperty(this, "submitUrl", _descriptor3, this);

    _initializerDefineProperty(this, "data", _descriptor4, this);

    _initializerDefineProperty(this, "design", _descriptor5, this);

    _initializerDefineProperty(this, "developer", _descriptor6, this);

    _initializerDefineProperty(this, "editingData", _descriptor7, this);

    _initializerDefineProperty(this, "editing", _descriptor8, this);

    _initializerDefineProperty(this, "containerTypes", _descriptor9, this);

    _initializerDefineProperty(this, "elementTypes", _descriptor10, this);

    _initializerDefineProperty(this, "checkType", _descriptor11, this);

    this.getIndex = function (data) {
      //获取元素索引
      return _this.data.indexOf(data);
    };

    _initializerDefineProperty(this, "setDownElement", _descriptor12, this);

    _initializerDefineProperty(this, "addItemInCol", _descriptor13, this);

    _initializerDefineProperty(this, "addColIntoRow", _descriptor14, this);

    this.checkName = function (str, type) {
      var l = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var exsit = _this.data.filter(function (e) {
        return e.fieldName == str;
      }).length > l;

      if (exsit) {
        _this.index++;
        str = "".concat(type).concat(_this.index);
        str = _this.checkName(str, type);
      }

      return str;
    };

    _initializerDefineProperty(this, "addElement", _descriptor15, this);

    _initializerDefineProperty(this, "createElement", _descriptor16, this);

    _initializerDefineProperty(this, "moveElement", _descriptor17, this);

    _initializerDefineProperty(this, "editingShow", _descriptor18, this);

    _initializerDefineProperty(this, "deleteItem", _descriptor19, this);

    _initializerDefineProperty(this, "setEditingData", _descriptor20, this);

    _initializerDefineProperty(this, "setEditState", _descriptor21, this);

    _initializerDefineProperty(this, "setGroupData", _descriptor22, this);

    _initializerDefineProperty(this, "addGroupData", _descriptor23, this);

    _initializerDefineProperty(this, "deleteGroupData", _descriptor24, this);

    this.dragDirection = function (initialClientOffset, clientOffset, sourceClientOffset) {
      var hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
      var hoverClientY = clientOffset.y - sourceClientOffset.y;

      if (hoverClientY > hoverMiddleY) {
        return "Bottom";
      }

      if (hoverClientY < hoverMiddleY) {
        return 'Top';
      }
    };
  }

  _createClass(Store, [{
    key: "init",
    value: function init(_ref) {
      var design = _ref.design,
          _ref$simple = _ref.simple,
          simple = _ref$simple === void 0 ? false : _ref$simple,
          _ref$data = _ref.data,
          _ref$data$data = _ref$data.data,
          data = _ref$data$data === void 0 ? [] : _ref$data$data,
          submitUrl = _ref$data.submitUrl,
          _ref$data$index = _ref$data.index,
          index = _ref$data$index === void 0 ? 0 : _ref$data$index,
          developer = _ref.developer;
      this.design = design;
      this.developer = developer;
      this.data = data;
      this.simple = simple;
      this.submitUrl = submitUrl;
      this.index = Number(index);
    }
  }]);

  return Store;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "simple", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "editorState", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _draftJs.EditorState.createEmpty();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "submitUrl", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "data", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "design", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "developer", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "editingData", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "editing", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "containerTypes", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [{
      type: "row",
      name: "\u884C",
      demo: true
    }, {
      type: "col",
      name: "\u5217",
      demo: true
    }];
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "elementTypes", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [//元素类型
    {
      type: "input",
      name: "\u6587\u672C\u8F93\u5165\u6846",
      demo: true
    }, {
      type: "inputNumber",
      name: "\u6570\u5B57\u8F93\u5165\u6846",
      demo: true
    }, {
      type: "radio",
      name: "\u5355\u9009\u6846",
      demo: true
    }, {
      type: "checkbox",
      name: "\u590D\u9009\u6846",
      demo: true
    }, {
      type: "checkboxGroup",
      name: "\u590D\u9009\u6846\u7EC4",
      demo: true
    }, {
      type: "select",
      name: "\u4E0B\u62C9\u6846",
      demo: true
    }];
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "checkType", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return function (item) {
      //检查元素类型赋予功能
      var type = item.type;
      (0, _mobx.set)(item, 'required', false);
      (0, _mobx.set)(item, 'requiredMessage', '');

      if (type == "checkboxGroup" || type == "radio" || type == "select") {
        (0, _mobx.set)(item, 'options', [{
          label: 'default1',
          value: 'default1Value'
        }, {
          label: 'default2',
          value: 'default2Value'
        }]);

        if (type == "checkboxGroup" || type == "radio") {
          (0, _mobx.set)(item, 'optionRowShow', 3);
        }
      } else if (type == "row") {
        (0, _mobx.set)(item, 'children', []);
      }
    };
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "setDownElement", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (element) {
      //稳定元素
      if (element.demo) {
        delete element.demo;

        var newDemo = _objectSpread({}, element, {
          demo: true
        });

        var type = 'elementTypes';

        if (element.type == 'row' || element.type == 'col') {
          type = 'containerTypes';
        }

        var index = _this2[type].indexOf(element);

        _this2[type].splice(index, 1);

        _this2[type].splice(index, 0, newDemo);

        _this2[type] = _toConsumableArray(_this2[type]);
      }
    };
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "addItemInCol", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (dragItem, hoverItem) {
      //元素放入col中
      if (hoverItem.children.length === 0) {
        _this3.data.remove(dragItem);

        dragItem.inCol = true;
        hoverItem.children.push(dragItem);
      }
    };
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, "addColIntoRow", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return function (col, row) {
      // console.log(col,row);
      if (row.children.indexOf(col) < 0) {
        (0, _mobx.set)(col, 'children', []);
        (0, _mobx.set)(col, 'span', 24); // const copyItem=observable({...col});

        row.children.push(col);
      }
    };
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, "addElement", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (item) {
      //点击添加元素
      if (item.type == 'col') {
        var rows = _this4.data.filter(function (e) {
          return e.type == "row";
        });

        if (rows.length == 0) {
          return;
        }

        (0, _mobx.set)(item, 'children', []);
        (0, _mobx.set)(item, 'span', 24);

        var _copyItem = (0, _mobx.observable)(_objectSpread({}, item));

        rows[0].children.push(_copyItem);
        return;
      }

      var flC = "".concat(item.type).concat(_this4.index);

      var fl = _this4.checkName(flC, item.type);

      var copyItem = (0, _mobx.observable)(_objectSpread({}, item, {
        fieldName: fl,
        label: fl,
        demo: false
      }));

      _this4.checkType(copyItem);

      _this4.data = _toConsumableArray(_this4.data).concat([copyItem]);
      _this4.index++;
    };
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, "createElement", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (dragItem, hoverIndex) {
      //生成元素
      if (dragItem.inCol === true) {
        return;
      }

      var flC = "".concat(dragItem.type).concat(_this5.index);

      var fl = _this5.checkName(flC, dragItem.type);

      (0, _mobx.set)(dragItem, 'fieldName', fl);
      (0, _mobx.set)(dragItem, 'label', fl);

      _this5.checkType(dragItem);

      _this5.index++; // this.data.splice(hoverIndex, 0, dragItem);
      // this.data.splice(hoverIndex, 1);

      _this5.data.splice(hoverIndex, 0, dragItem);
    };
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, "moveElement", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (dragIndex, hoverIndex) {
      //移动元素
      var data = _this6.data;
      console.log(dragIndex, hoverIndex);
      var dragCard = data[dragIndex];
      var hoverCard = data[hoverIndex];
      data.splice(dragIndex, 1);
      data.splice(hoverIndex, 0, dragCard);
    };
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class.prototype, "editingShow", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (data) {
      _this7.editing = true;
      _this7.editingData = data;

      _this7.setEditState(data);
    };
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class.prototype, "deleteItem", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;

    return function (item) {
      var i = _this8.getIndex(item);

      _this8.data.splice(i, 1);
    };
  }
}), _descriptor20 = _applyDecoratedDescriptor(_class.prototype, "setEditingData", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this9 = this;

    return function (field, value) {
      _this9.editingData[field] = value;
    };
  }
}), _descriptor21 = _applyDecoratedDescriptor(_class.prototype, "setEditState", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this10 = this;

    return function (data) {
      //富文本
      var editorState;
      var newContent = (0, _draftJs.convertFromHTML)(data.label);

      if (!newContent.contentBlocks) {
        editorState = _draftJs.EditorState.createEmpty();
      } else {
        var contentState = _draftJs.ContentState.createFromBlockArray(newContent);

        editorState = _draftJs.EditorState.createWithContent(contentState);
      }

      _this10.editorState = editorState;
    };
  }
}), _descriptor22 = _applyDecoratedDescriptor(_class.prototype, "setGroupData", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this11 = this;

    return function (data, field, index, gpfield, value) {
      var i = _this11.getIndex(data);

      _this11.data[i][field][index][gpfield] = value;
    };
  }
}), _descriptor23 = _applyDecoratedDescriptor(_class.prototype, "addGroupData", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this12 = this;

    return function (data, field, index, insertData) {
      var i = _this12.getIndex(data);

      _this12.data[i][field].splice(index + 1, 0, insertData);
    };
  }
}), _descriptor24 = _applyDecoratedDescriptor(_class.prototype, "deleteGroupData", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this13 = this;

    return function (data, field, index) {
      var i = _this13.getIndex(data);

      _this13.data[i][field].splice(index, 1);
    };
  }
}), _applyDecoratedDescriptor(_class.prototype, "init", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "init"), _class.prototype)), _class);
exports.default = Store;