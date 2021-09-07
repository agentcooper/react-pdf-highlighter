import React, { Component } from "react";
import MouseMonitor from "./MouseMonitor";
export class Popup extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            mouseIn: false,
        };
    }
    render() {
        const { onMouseOver, popupContent, onMouseOut } = this.props;
        return (React.createElement("div", { onMouseOver: () => {
                this.setState({ mouseIn: true });
                onMouseOver(React.createElement(MouseMonitor, { onMoveAway: () => {
                        if (this.state.mouseIn) {
                            return;
                        }
                        onMouseOut();
                    }, paddingX: 60, paddingY: 30, children: popupContent }));
            }, onMouseOut: () => {
                this.setState({ mouseIn: false });
            } }, this.props.children));
    }
}
export default Popup;
//# sourceMappingURL=Popup.js.map