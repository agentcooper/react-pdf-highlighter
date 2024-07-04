import { Component } from "react";
interface Props {
    onMouseOver: (content: JSX.Element) => void;
    popupContent: JSX.Element;
    onMouseOut: () => void;
    children: JSX.Element;
}
interface State {
    mouseIn: boolean;
}
export declare class Popup extends Component<Props, State> {
    state: State;
    render(): JSX.Element;
}
export default Popup;
