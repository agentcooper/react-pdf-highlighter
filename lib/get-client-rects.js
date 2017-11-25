"use strict";

exports.__esModule = true;

var _optimizeClientRects = require("./optimize-client-rects");

var _optimizeClientRects2 = _interopRequireDefault(_optimizeClientRects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getClientRects = function getClientRects(range, containerEl) {
  var shouldOptimize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var clientRects = Array.from(range.getClientRects());

  var offset = containerEl.getBoundingClientRect();

  var rects = clientRects.map(function (rect) {
    return {
      top: rect.top + containerEl.scrollTop - offset.top,
      left: rect.left + containerEl.scrollLeft - offset.left,
      width: rect.width,
      height: rect.height
    };
  });

  return shouldOptimize ? (0, _optimizeClientRects2.default)(rects) : rects;
};

exports.default = getClientRects;
module.exports = exports["default"];