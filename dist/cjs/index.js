"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfLoader = exports.AreaHighlight = exports.Popup = exports.Highlight = exports.Tip = exports.PdfHighlighter = void 0;
var PdfHighlighter_1 = require("./components/PdfHighlighter");
Object.defineProperty(exports, "PdfHighlighter", { enumerable: true, get: function () { return PdfHighlighter_1.PdfHighlighter; } });
var Tip_1 = require("./components/Tip");
Object.defineProperty(exports, "Tip", { enumerable: true, get: function () { return Tip_1.Tip; } });
var Highlight_1 = require("./components/Highlight");
Object.defineProperty(exports, "Highlight", { enumerable: true, get: function () { return Highlight_1.Highlight; } });
var Popup_1 = require("./components/Popup");
Object.defineProperty(exports, "Popup", { enumerable: true, get: function () { return Popup_1.Popup; } });
var AreaHighlight_1 = require("./components/AreaHighlight");
Object.defineProperty(exports, "AreaHighlight", { enumerable: true, get: function () { return AreaHighlight_1.AreaHighlight; } });
var PdfLoader_1 = require("./components/PdfLoader");
Object.defineProperty(exports, "PdfLoader", { enumerable: true, get: function () { return PdfLoader_1.PdfLoader; } });
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map