import React, { Component } from "react";
import "../style/Tip.css";
export class Tip extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            compact: true,
            text: "",
            category: "",
        };
    }
    // for TipContainer
    componentDidUpdate(nextProps, nextState) {
        const { onUpdate } = this.props;
        if (onUpdate && this.state.compact !== nextState.compact) {
            onUpdate();
        }
    }
    render() {
        const { onConfirm, onOpen } = this.props;
        const { compact, text, category: category } = this.state;
        return (React.createElement("div", { className: "Tip" }, compact ? (React.createElement("div", { className: "Tip__compact", onClick: () => {
                onOpen();
                this.setState({ compact: false });
            } }, "Add highlight")) : (React.createElement("form", { className: "Tip__card", onSubmit: (event) => {
                event.preventDefault();
                onConfirm({ text, category: category });
            } },
            React.createElement("div", null,
                React.createElement("textarea", { placeholder: "Your comment", autoFocus: true, value: text, onChange: (event) => this.setState({ text: event.target.value }), ref: (node) => {
                        if (node) {
                            node.focus();
                        }
                    } }),
                React.createElement("div", null, ["Premise", "Assumption", "Target"].map((_category) => (React.createElement("label", { key: _category },
                    React.createElement("input", { checked: category === _category, type: "radio", name: "category", value: _category, onChange: (event) => this.setState({ category: event.target.value }) }),
                    _category))))),
            React.createElement("div", null,
                React.createElement("input", { type: "submit", value: "Save" }))))));
    }
}
export default Tip;
//# sourceMappingURL=Tip.js.map