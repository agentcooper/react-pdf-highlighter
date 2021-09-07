import React, { Component } from "react";
const clamp = (value, left, right) => Math.min(Math.max(value, left), right);
class TipContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            height: 0,
            width: 0,
        };
        this.node = null;
        this.updatePosition = () => {
            if (!this.node) {
                return;
            }
            const { offsetHeight, offsetWidth } = this.node;
            this.setState({
                height: offsetHeight,
                width: offsetWidth,
            });
        };
    }
    componentDidUpdate(nextProps) {
        if (this.props.children !== nextProps.children) {
            this.updatePosition();
        }
    }
    componentDidMount() {
        setTimeout(this.updatePosition, 0);
    }
    render() {
        const { children, style, scrollTop, pageBoundingRect } = this.props;
        const { height, width } = this.state;
        const isStyleCalculationInProgress = width === 0 && height === 0;
        const shouldMove = style.top - height - 5 < scrollTop;
        const top = shouldMove ? style.bottom + 5 : style.top - height - 5;
        const left = clamp(style.left - width / 2, 0, pageBoundingRect.width - width);
        const childrenWithProps = React.Children.map(children, (child) => 
        // @ts-ignore
        React.cloneElement(child, {
            onUpdate: () => {
                this.setState({
                    width: 0,
                    height: 0,
                }, () => {
                    setTimeout(this.updatePosition, 0);
                });
            },
            popup: {
                position: shouldMove ? "below" : "above",
            },
        }));
        return (React.createElement("div", { className: "PdfHighlighter__tip-container", style: {
                visibility: isStyleCalculationInProgress ? "hidden" : "visible",
                top,
                left,
            }, ref: (node) => {
                this.node = node;
            } }, childrenWithProps));
    }
}
export default TipContainer;
//# sourceMappingURL=TipContainer.js.map