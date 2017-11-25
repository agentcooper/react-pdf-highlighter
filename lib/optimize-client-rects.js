"use strict";

exports.__esModule = true;


var sort = function sort(rects) {
  return rects.sort(function (A, B) {
    var top = A.top - B.top;

    if (top === 0) {
      return A.left - B.left;
    }

    return top;
  });
};

var overlaps = function overlaps(A, B) {
  return A.left <= B.left && B.left <= A.left + A.width;
};

var sameLine = function sameLine(A, B) {
  var yMargin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  return Math.abs(A.top - B.top) < yMargin && Math.abs(A.height - B.height) < yMargin;
};

var inside = function inside(A, B) {
  return A.top > B.top && A.left > B.left && A.top + A.height < B.top + B.height && A.left + A.width < B.left + B.width;
};

var nextTo = function nextTo(A, B) {
  var xMargin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

  var Aright = A.left + A.width;
  var Bright = B.left + B.width;

  return A.left <= B.left && Aright <= Bright && B.left - Aright <= xMargin;
};

var extendWidth = function extendWidth(A, B) {
  // extend width of A to cover B
  A.width = Math.max(B.width - A.left + B.left, A.width);
};

var optimizeClientRects = function optimizeClientRects(clientRects) {
  var rects = sort(clientRects);

  var toRemove = new Set();

  var firstPass = rects.filter(function (rect) {
    return rects.every(function (otherRect) {
      return !inside(rect, otherRect);
    });
  });

  var passCount = 0;

  while (passCount <= 2) {
    firstPass.forEach(function (A) {
      firstPass.forEach(function (B) {
        if (A === B || toRemove.has(A) || toRemove.has(B)) {
          return;
        }

        if (!sameLine(A, B)) {
          return;
        }

        if (overlaps(A, B)) {
          extendWidth(A, B);
          A.height = Math.max(A.height, B.height);

          toRemove.add(B);
        }

        if (nextTo(A, B)) {
          extendWidth(A, B);

          toRemove.add(B);
        }
      });
    });
    passCount += 1;
  }

  return firstPass.filter(function (rect) {
    return !toRemove.has(rect);
  });
};

exports.default = optimizeClientRects;
module.exports = exports["default"];