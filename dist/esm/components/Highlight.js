import React, { Component } from "react";
import "../style/Highlight.css";
export class Highlight extends Component {
    render() {
        const { position, onClick, onMouseOver, onMouseOut, comment, isScrolledTo, } = this.props;
        const { rects, boundingRect } = position;
        return (React.createElement("div", { className: `Highlight ${isScrolledTo
                ? "Highlight--scrolledTo"
                : comment && comment.category
                    ? `Highlight--${comment.category}`
                    : ""}` },
            comment ? (React.createElement("div", { className: "Highlight__category", style: {
                    left: 0,
                    top: boundingRect.top,
                } }, comment.category)) : null,
            React.createElement("div", { className: "Highlight__parts" }, rects.map((rect, index) => (React.createElement("div", { onMouseOver: onMouseOver, onMouseOut: onMouseOut, onClick: onClick, key: index, style: rect, className: `Highlight__part` }))))));
    }
}
export default Highlight;
//# sourceMappingURL=Highlight.js.map