"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaHighlight = void 0;
const react_1 = __importStar(require("react"));
const react_rnd_1 = require("react-rnd");
require("../style/AreaHighlight.css");
class AreaHighlight extends react_1.Component {
    render() {
        const _a = this.props, { highlight, onChange, comment, isScrolledTo, categoryLabels } = _a, otherProps = __rest(_a, ["highlight", "onChange", "comment", "isScrolledTo", "categoryLabels"]);
        const handleStyle = (labels) => {
            let color = "#ddcc77";
            if (isScrolledTo) {
                return { background: "" };
            }
            if (comment) {
                for (let item of labels) {
                    if (comment.category === item.label) {
                        color = item.background;
                    }
                }
            }
            return { background: color };
        };
        /*   : comment && comment.category
        ? `AreaHighlight--${comment.category}`
     */
        return (react_1.default.createElement("div", { className: `AreaHighlight ${isScrolledTo ? "AreaHighlight--scrolledTo" : ""}` },
            react_1.default.createElement(react_rnd_1.Rnd, Object.assign({ className: "AreaHighlight__part", onDragStop: (_, data) => {
                    const boundingRect = Object.assign(Object.assign({}, highlight.position.boundingRect), { top: data.y, left: data.x });
                    onChange(boundingRect);
                }, onResizeStop: (_, direction, ref, delta, position) => {
                    const boundingRect = {
                        top: position.y,
                        left: position.x,
                        width: ref.offsetWidth,
                        height: ref.offsetHeight,
                    };
                    onChange(boundingRect);
                }, position: {
                    x: highlight.position.boundingRect.left,
                    y: highlight.position.boundingRect.top,
                }, size: {
                    width: highlight.position.boundingRect.width,
                    height: highlight.position.boundingRect.height,
                }, onClick: (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                } }, otherProps, { style: handleStyle(categoryLabels) }))));
    }
}
exports.AreaHighlight = AreaHighlight;
exports.default = AreaHighlight;
//# sourceMappingURL=AreaHighlight.js.map