import { Component } from "react";
import "../style/Tip.css";
interface State {
    compact: boolean;
    text: string;
    category: string;
}
interface Props {
    onConfirm: (comment: {
        text: string;
        category: string;
    }) => void;
    onOpen: () => void;
    onUpdate?: () => void;
    categoryLabels: Array<{
        label: string;
        background: string;
    }>;
}
export declare class Tip extends Component<Props, State> {
    state: State;
    componentDidUpdate(nextProps: Props, nextState: State): void;
    render(): JSX.Element;
}
export default Tip;
