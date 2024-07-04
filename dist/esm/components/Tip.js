import React, { Component } from "react";
import "../style/Tip.css";
export class Tip extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            compact: true,
            text: "",
            emoji: "",
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
        const { compact, text, emoji } = this.state;
        return (React.createElement("div", { className: "Tip" }, compact ? (React.createElement("div", { className: "Tip__compact", onClick: () => {
                onOpen();
                this.setState({ compact: false });
            } }, "Add highlight")) : (React.createElement("form", { className: "Tip__card", onSubmit: (event) => {
                event.preventDefault();
                onConfirm({ text, emoji });
            } },
            React.createElement("div", null,
                React.createElement("textarea", { placeholder: "Your comment", autoFocus: true, value: text, onChange: (event) => this.setState({ text: event.target.value }), ref: (node) => {
                        if (node) {
                            node.focus();
                        }
                    } }),
                React.createElement("div", null, ["💩", "😱", "😍", "🔥", "😳", "⚠️"].map((_emoji) => (React.createElement("label", { key: _emoji },
                    React.createElement("input", { checked: emoji === _emoji, type: "radio", name: "emoji", value: _emoji, onChange: (event) => this.setState({ emoji: event.target.value }) }),
                    _emoji))))),
            React.createElement("div", null,
                React.createElement("input", { type: "submit", value: "Save" }))))));
    }
}
export default Tip;
//# sourceMappingURL=Tip.js.map