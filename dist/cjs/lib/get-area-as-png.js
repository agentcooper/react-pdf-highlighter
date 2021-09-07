"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdfjs_dom_1 = require("./pdfjs-dom");
const getAreaAsPNG = (canvas, position) => {
    const { left, top, width, height } = position;
    const doc = canvas ? canvas.ownerDocument : null;
    // @TODO: cache this?
    const newCanvas = doc && doc.createElement("canvas");
    if (!newCanvas || !(0, pdfjs_dom_1.isHTMLCanvasElement)(newCanvas)) {
        return "";
    }
    newCanvas.width = width;
    newCanvas.height = height;
    const newCanvasContext = newCanvas.getContext("2d");
    if (!newCanvasContext || !canvas) {
        return "";
    }
    const dpr = window.devicePixelRatio;
    newCanvasContext.drawImage(canvas, left * dpr, top * dpr, width * dpr, height * dpr, 0, 0, width, height);
    return newCanvas.toDataURL("image/png");
};
exports.default = getAreaAsPNG;
//# sourceMappingURL=get-area-as-png.js.map