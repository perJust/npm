"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = startGetApi;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var http = require('http');

var fs = require('fs');

var httpGetApiOptions = {
  hostname: '172.27.16.36',
  port: 8080,
  path: '/v2/api-docs?group=%E9%BB%98%E8%AE%A4%E6%8E%A5%E5%8F%A3',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
};

function startGetApi() {
  var getApi = http.request(httpGetApiOptions, function (res) {
    var data = '';
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      var resObj = eval('(' + data + ')');
      performDataAnalysis(resObj);
    });
  });
  getApi.on('error', function (err) {
    console.log('err:', err);
  });
  getApi.end();
}

function connectHeadEnd(str, name) {
  return "import request from '@/service/funcRequest';\nclass ".concat(name, "{").concat(str, "\n}\n\nexport default new ").concat(name, "();\n");
}

function createFsDir(dir) {
  if (!fs.existsSync(process.cwd + dir)) {
    fs.mkdirSync();
  }
}

function performPathsAnalysis(_ref, tagsMap) {
  var paths = _ref.paths,
      _ref$definitions = _ref.definitions,
      definitions = _ref$definitions === void 0 ? {} : _ref$definitions;
  var pathUrlList = Object.keys(paths);

  var tagToReqMap = _defineProperty({}, otherTag, '');

  for (var _i = 0, _pathUrlList = pathUrlList; _i < _pathUrlList.length; _i++) {
    var item = _pathUrlList[_i];
    var curr = paths[item],
        currMth = Object.keys(curr);
    var name = item.replace(/(.)?\/(.)/g, function ($0, $1, $2) {
      return $1 ? $1 + $2.toUpperCase() : $2.toLowerCase();
    });

    for (var _i2 = 0, _currMth = currMth; _i2 < _currMth.length; _i2++) {
      var mth = _currMth[_i2];
      var c = curr[mth],
          tag = c.tags && c.tags[0];
      var rowReqParaFor = 'params';

      if (mth === 'post' && c.parameters && c.parameters[0] && c.parameters[0]["in"] === 'query') {
        rowReqParaFor = 'data';
      }

      var content = "\n    /**\n     * @name ".concat(c.summary, "\n     */\n    public ").concat(name + mth.replace(mth[0], mth[0].toUpperCase()), "(paramConfig) {\n        return request({\n            url: \"").concat(item, "\",\n            method: \"").concat(mth, "\",\n            ").concat(rowReqParaFor, ": paramConfig,\n          });\n    }\n            ");

      if (tag) {
        tagToReqMap[tag] = (tagToReqMap[tag] || '') + content;
      } else {
        tagToReqMap[otherTag] = tagToReqMap[otherTag] + content;
      }
    }
  }

  return [tagToReqMap];
}

var otherTag = '其余无分类的请求集合',
    other = _defineProperty({}, otherTag, 'other');

function performDataAnalysis(data) {
  var tags = _objectSpread({}, other);

  var _iterator = _createForOfIteratorHelper(data.tags),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _item = _step.value;
      tags[_item.name] = _item.description.replace(/ /g, '');
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var _performPathsAnalysis = performPathsAnalysis(data, tags),
      _performPathsAnalysis2 = _slicedToArray(_performPathsAnalysis, 1),
      tagToReqMap = _performPathsAnalysis2[0];

  var dir = '/modules';
  createFsDir(dir);
  var all = Object.keys(tagToReqMap);

  for (var _i3 = 0, _all = all; _i3 < _all.length; _i3++) {
    var item = _all[_i3];
    fs.writeFile(process.cwd + "".concat(dir, "/").concat(tags[item], ".ts"), connectHeadEnd(tagToReqMap[item], tags[item]), function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
}