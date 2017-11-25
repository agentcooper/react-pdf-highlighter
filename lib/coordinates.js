"use strict";

exports.__esModule = true;


// "viewport" rectangle is { top, left, width, height }

// "scaled" means that data structure stores (0, 1) coordinates.
// for clarity reasons I decided not to store actual (0, 1) coordinates, but
// provide width and height, so user can compute ratio himself if needed

var viewportToScaled = exports.viewportToScaled = function viewportToScaled(rect, _ref) {
  var width = _ref.width,
      height = _ref.height;

  return {
    x1: rect.left,
    y1: rect.top,

    x2: rect.left + rect.width,
    y2: rect.top + rect.height,

    width: width,
    height: height
  };
};

var pdfToViewport = function pdfToViewport(pdf, viewport) {
  var _viewport$convertToVi = viewport.convertToViewportRectangle([pdf.x1, pdf.y1, pdf.x2, pdf.y2]),
      x1 = _viewport$convertToVi[0],
      y1 = _viewport$convertToVi[1],
      x2 = _viewport$convertToVi[2],
      y2 = _viewport$convertToVi[3];

  return {
    left: x1,
    top: y1,

    width: x2 - x1,
    height: y1 - y2
  };
};

var scaledToViewport = exports.scaledToViewport = function scaledToViewport(scaled, viewport) {
  var usePdfCoordinates = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var width = viewport.width,
      height = viewport.height;


  if (usePdfCoordinates) {
    return pdfToViewport(scaled, viewport);
  }

  if (!scaled.x1) {
    throw new Error("You are using old position format, please update");
  }

  var x1 = width * scaled.x1 / scaled.width;
  var y1 = height * scaled.y1 / scaled.height;

  var x2 = width * scaled.x2 / scaled.width;
  var y2 = height * scaled.y2 / scaled.height;

  return {
    left: x1,
    top: y1,
    width: x2 - x1,
    height: y2 - y1
  };
};