"use strict";

exports.__esModule = true;
var getPageFromElement = exports.getPageFromElement = function getPageFromElement(target) {
  var node = target.closest(".page");

  if (!(node instanceof HTMLElement)) {
    return null;
  }

  var number = Number(node.dataset.pageNumber);

  return { node: node, number: number };
};

var getPageFromRange = exports.getPageFromRange = function getPageFromRange(range) {
  var parentElement = range.startContainer.parentElement;

  if (!(parentElement instanceof HTMLElement)) {
    return;
  }

  return getPageFromElement(parentElement);
};

var findOrCreateContainerLayer = exports.findOrCreateContainerLayer = function findOrCreateContainerLayer(container, className) {
  var layer = container.querySelector("." + className);

  if (!layer) {
    layer = document.createElement("div");
    layer.className = className;
    container.appendChild(layer);
  }

  return layer;
};