import React, { Component } from "react";

import "../style/Highlight.css";

import type { LTWHP } from "../types.js";

interface Props {
  position: {
    boundingRect: LTWHP;
    rects: Array<LTWHP>;
  };
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  comment: {
    emoji: string;
    text: string;
  };
  isScrolledTo: boolean;
  customRender?: React.ReactElement;
}

export class Highlight extends Component<Props> {
  render() {
    const { position, onClick, onMouseOver, onMouseOut, comment, isScrolledTo, customRender } = this.props;

    const { rects, boundingRect } = position;

    return (
      <div
        className={`Highlight ${isScrolledTo ? "Highlight--scrolledTo" : ""}`}
      >
        {comment ? (
          <div
            className="Highlight__emoji"
            style={{
              left: 20,
              top: boundingRect.top,
            }}
          >
            {comment.emoji}
          </div>
        ) : null}
        <div className="Highlight__parts">
          {rects.map((rect, index) => (
            <div
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
              onClick={onClick}
              key={index}
              style={rect}
              className={`Highlight__part`}
            >{customRender}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default Highlight;
