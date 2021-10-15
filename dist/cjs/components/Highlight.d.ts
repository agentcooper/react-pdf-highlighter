import { Component } from "react";
import "../style/Highlight.css";
import type { LTWH } from "../types.js";
interface Props {
    categoryLabels: Array<{
        label: string;
        background: string;
    }>;
    position: {
        boundingRect: LTWH;
        rects: Array<LTWH>;
    };
    onClick?: () => void;
    onMouseOver?: () => void;
    onMouseOut?: () => void;
    comment: {
        category: string;
        text: string;
    };
    isScrolledTo: boolean;
}
export declare class Highlight extends Component<Props> {
    render(): JSX.Element;
}
export default Highlight;
