"use strict";

exports.__esModule = true;


var getBoundingRect = function getBoundingRect(clientRects) {
  var rects = Array.from(clientRects).map(function (rect) {
    var left = rect.left,
        top = rect.top,
        width = rect.width,
        height = rect.height;


    var X0 = left;
    var X1 = left + width;

    var Y0 = top;
    var Y1 = top + height;

    return { X0: X0, X1: X1, Y0: Y0, Y1: Y1 };
  });

  var optimal = rects.reduce(function (res, rect) {
    return {
      X0: Math.min(res.X0, rect.X0),
      X1: Math.max(res.X1, rect.X1),

      Y0: Math.min(res.Y0, rect.Y0),
      Y1: Math.max(res.Y1, rect.Y1)
    };
  }, rects[0]);

  var X0 = optimal.X0,
      X1 = optimal.X1,
      Y0 = optimal.Y0,
      Y1 = optimal.Y1;


  return {
    left: X0,
    top: Y0,
    width: X1 - X0,
    height: Y1 - Y0
  };
};

exports.default = getBoundingRect;
module.exports = exports["default"];