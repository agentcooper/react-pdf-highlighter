"use strict";

exports.__esModule = true;


var getAreaAsPNG = function getAreaAsPNG(canvas, position) {
  var left = position.left,
      top = position.top,
      width = position.width,
      height = position.height;

  // @TODO: cache this?

  var newCanvas = document.createElement("canvas");

  if (!(newCanvas instanceof HTMLCanvasElement)) {
    return "";
  }

  newCanvas.width = width;
  newCanvas.height = height;

  var newCanvasContext = newCanvas.getContext("2d");

  if (!newCanvasContext || !canvas) {
    return "";
  }

  var dpr = window.devicePixelRatio;

  newCanvasContext.drawImage(canvas, left * dpr, top * dpr, width * dpr, height * dpr, 0, 0, width, height);

  return newCanvas.toDataURL("image/png");
};

exports.default = getAreaAsPNG;
module.exports = exports["default"];