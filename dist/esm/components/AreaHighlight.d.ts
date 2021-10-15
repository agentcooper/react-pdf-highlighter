import { Component } from "react";
import "../style/AreaHighlight.css";
import type { LTWH, ViewportHighlight } from "../types.js";
interface Props {
    categoryLabels: Array<{
        label: string;
        background: string;
    }>;
    highlight: ViewportHighlight;
    onChange: (rect: LTWH) => void;
    comment: {
        category: string;
        text: string;
    };
    isScrolledTo: boolean;
}
export declare class AreaHighlight extends Component<Props> {
    render(): JSX.Element;
}
export default AreaHighlight;
