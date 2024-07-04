import { Component } from "react";
import type { LTWHP } from "../types";
interface State {
    height: number;
    width: number;
}
interface Props {
    children: JSX.Element | null;
    style: {
        top: number;
        left: number;
        bottom: number;
    };
    scrollTop: number;
    pageBoundingRect: LTWHP;
}
declare class TipContainer extends Component<Props, State> {
    state: State;
    node: HTMLDivElement | null;
    componentDidUpdate(nextProps: Props): void;
    componentDidMount(): void;
    updatePosition: () => void;
    render(): JSX.Element;
}
export default TipContainer;
