import React, { Component } from "react";
import "../style/Highlight.css";
export class Highlight extends Component {
    render() {
        const { categoryLabels, position, onClick, onMouseOver, onMouseOut, comment, isScrolledTo, } = this.props;
        const { rects, boundingRect } = position;
        const handleStyle = (rect, labels) => {
            let color = "#ddcc77";
            if (isScrolledTo) {
                return Object.assign(Object.assign({}, rect), { background: "" });
            }
            if (comment) {
                for (let item of labels) {
                    if (comment.category === item.label) {
                        color = item.background;
                    }
                }
            }
            return Object.assign(Object.assign({}, rect), { background: color });
        };
        /* : comment && comment.category
                ? `Highlight--${comment.category}` */
        return (React.createElement("div", { className: `Highlight ${isScrolledTo ? "Highlight--scrolledTo" : ""}` },
            comment ? (React.createElement("div", { className: "Highlight__category", style: {
                    left: 0,
                    top: boundingRect.top,
                } }, comment.category)) : null,
            React.createElement("div", { className: "Highlight__parts" }, rects.map((rect, index) => (React.createElement("div", { onMouseOver: onMouseOver, onMouseOut: onMouseOut, onClick: onClick, key: index, style: handleStyle(rect, categoryLabels), 
                //style={rect}
                className: `Highlight__part` }))))));
    }
}
export default Highlight;
//# sourceMappingURL=Highlight.js.map