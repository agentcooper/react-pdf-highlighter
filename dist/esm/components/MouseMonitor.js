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
class MouseMonitor extends Component {
    constructor() {
        super(...arguments);
        this.container = null;
        this.unsubscribe = () => { };
        this.onMouseMove = (event) => {
            if (!this.container) {
                return;
            }
            const { onMoveAway, paddingX, paddingY } = this.props;
            const { clientX, clientY } = event;
            // TODO: see if possible to optimize
            const { left, top, width, height } = this.container.getBoundingClientRect();
            const inBoundsX = clientX > left - paddingX && clientX < left + width + paddingX;
            const inBoundsY = clientY > top - paddingY && clientY < top + height + paddingY;
            const isNear = inBoundsX && inBoundsY;
            if (!isNear) {
                onMoveAway();
            }
        };
        this.attachRef = (ref) => {
            this.container = ref;
            this.unsubscribe();
            if (ref) {
                const { ownerDocument: doc } = ref;
                doc.addEventListener("mousemove", this.onMouseMove);
                this.unsubscribe = () => {
                    doc.removeEventListener("mousemove", this.onMouseMove);
                };
            }
        };
    }
    render() {
        // eslint-disable-next-line
        const _a = this.props, { onMoveAway, paddingX, paddingY, children } = _a, restProps = __rest(_a, ["onMoveAway", "paddingX", "paddingY", "children"]);
        return (React.createElement("div", { ref: this.attachRef }, React.cloneElement(children, restProps)));
    }
}
export default MouseMonitor;
//# sourceMappingURL=MouseMonitor.js.map