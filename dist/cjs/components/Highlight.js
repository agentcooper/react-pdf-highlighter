"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Highlight = void 0;
const react_1 = __importStar(require("react"));
require("../style/Highlight.css");
class Highlight extends react_1.Component {
    render() {
        const { position, onClick, onMouseOver, onMouseOut, comment, isScrolledTo, } = this.props;
        const { rects, boundingRect } = position;
        return (react_1.default.createElement("div", { className: `Highlight ${isScrolledTo ? "Highlight--scrolledTo" : ""}` },
            comment ? (react_1.default.createElement("div", { className: "Highlight__emoji", style: {
                    left: 20,
                    top: boundingRect.top,
                } }, comment.emoji)) : null,
            react_1.default.createElement("div", { className: "Highlight__parts" }, rects.map((rect, index) => (react_1.default.createElement("div", { onMouseOver: onMouseOver, onMouseOut: onMouseOut, onClick: onClick, key: index, style: rect, className: `Highlight__part` }))))));
    }
}
exports.Highlight = Highlight;
exports.default = Highlight;
//# sourceMappingURL=Highlight.js.map