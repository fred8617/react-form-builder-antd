"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorRemind = exports.dealOverflowMsg = exports.download = exports.setI18n = exports.i18n = exports.dealErrorMessage = exports.getStrFromData = exports.formatDateYMDHMS0 = exports.formatDateYMD = exports.post = exports.ajax = exports.isIE11 = void 0;

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

require("antd/es/modal/style");

var _modal = _interopRequireDefault(require("antd/es/modal"));

var _react = _interopRequireDefault(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isIE11 = /Trident\/7\./.test(navigator.userAgent);
exports.isIE11 = isIE11;

var ajax = function ajax(way, url) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var resType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "json";

  for (var _len = arguments.length, rest = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    rest[_key - 4] = arguments[_key];
  }

  /*构造promise函数构造函数*/
  var promiseConstructor = function promiseConstructor() {
    var success = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (e) {
      return e;
    };
    var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (e) {
      return e;
    };
    var xhr = new XMLHttpRequest();
    /*获取ajax对象*/

    var string = "";
    xhr.open(way, url, true);
    /*发起请求*/

    xhr.responseType = resType;
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    for (var i in data) {
      if (data[i] === null || data[i] === undefined) {
        continue;
      }

      string += "&".concat(i, "=").concat(encodeURIComponent(data[i]));
    }

    xhr.send(string.replace("&", ""));
    /*请求参数*/

    /**
     * 成功回调
     * @param e
     */

    xhr.onload = function (e) {
      console.log("aaa", e);
      var res = e.currentTarget.response;

      if (isIE11) {
        res = JSON.parse(res);
      }

      ;
      success(res);
    };
    /*超时处理*/


    var timeout = function timeout(handlerObj) {
      xhr.timeout = handlerObj.timeout;
      xhr.ontimeout = handlerObj.fun;
    };

    xhr.onerror = function (e) {
      error(e);
    };

    rest[0] == null ? null : timeout(rest[1]);
    rest[1] == null ? null : xhr.onprogress(rest[2]);
  };

  return new Promise(promiseConstructor);
};
/*暂时除了post想不到用其他函数*/


exports.ajax = ajax;

var post = function post(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var resType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "json";

  if (window.noModify == true) {
    return _axios.default.post(url, data).then(function (e) {
      return e.data;
    });
  }

  for (var _len2 = arguments.length, rest = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
    rest[_key2 - 3] = arguments[_key2];
  }

  return ajax.apply(void 0, ["POST", url, data, resType].concat(rest));
};
/**
 * 时间格式化YYYY-MM-DD
 */


exports.post = post;

var formatDateYMD = function formatDateYMD(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1 < 10 ? "0".concat(date.getMonth() + 1) : date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0".concat(date.getDate()) : date.getDate();
  return "".concat(year, "-").concat(month, "-").concat(day);
};
/**
 * 时间格式化YYYY-MM-DD 00:00:00
 */


exports.formatDateYMD = formatDateYMD;

var formatDateYMDHMS0 = function formatDateYMDHMS0(date) {
  return "".concat(formatDateYMD(date), " 00:00:00");
};
/**
 * 将对象属性拼成一串a=b c=d
 */


exports.formatDateYMDHMS0 = formatDateYMDHMS0;

var getStrFromData = function getStrFromData(data) {
  var str = "";

  for (var j in data) {
    str += "".concat(j, "=\"").concat(data[j], "\" ");
  }

  ;
  return str;
};
/**
 * 处理报错信息
 */


exports.getStrFromData = getStrFromData;

var dealErrorMessage = function dealErrorMessage(messages, menuKey) {
  _modal.default.error({
    content: _react.default.createElement("div", null, messages.split("<!------!>").map(function (d, i) {
      return _react.default.createElement("div", null, d ? i18n(d, menuKey) : null);
    }))
  });
};

exports.dealErrorMessage = dealErrorMessage;

var i18n = function i18n(e) {
  return e;
};

exports.i18n = i18n;

var setI18n = function setI18n(fun) {
  exports.i18n = i18n = fun;
};

exports.setI18n = setI18n;

var download = function download(url, filename) {
  var that = _this;
  return new Promise(function (resolves) {
    getBlob(url).then(function (blob) {
      saveAs(blob, filename);
      resolves("success");
    });

    function getBlob(url) {
      return new Promise(function (resolve) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';

        xhr.onload = function () {
          if (xhr.status === 200) {
            resolve(xhr.response);
          }
        };

        xhr.send();
      });
    }

    function saveAs(blob, filename) {
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
      } else {
        var link = document.createElement('a');
        var body = document.querySelector('body');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.style.display = 'none';
        body.appendChild(link);
        link.click();
        body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      }
    }
  });
};

exports.download = download;

var dealOverflowMsg = function dealOverflowMsg(msg, number) {
  if (msg.length > number) {
    return msg.substr(0, number) + "...";
  }

  return msg;
};

exports.dealOverflowMsg = dealOverflowMsg;

var errorRemind = function errorRemind(res, messge) {
  if (res && res.message != "") {
    var msg = res.message.split("<!------!>").splice(msg.length - 1, 1);

    var content = _react.default.createElement("div", null, msg.map(function (item) {
      return _react.default.createElement("div", null, i18n(item));
    }));

    _message2.default.error(content, 2.5);
  } else {
    _message2.default.error(messge, 2.5);
  }
};

exports.errorRemind = errorRemind;