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
import React, { Component } from "react";
import { Rnd } from "react-rnd";
import "../style/AreaHighlight.css";
export class AreaHighlight extends Component {
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
        return (React.createElement("div", { className: `AreaHighlight ${isScrolledTo ? "AreaHighlight--scrolledTo" : ""}` },
            React.createElement(Rnd, Object.assign({ className: "AreaHighlight__part", onDragStop: (_, data) => {
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
export default AreaHighlight;
//# sourceMappingURL=AreaHighlight.js.map