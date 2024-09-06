import React, { Component } from "react";

import styles from "../style/Highlight.module.css";

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
}

export class Highlight extends Component<Props> {
  render() {
    const {
      position,
      onClick,
      onMouseOver,
      onMouseOut,
      comment,
      isScrolledTo,
    } = this.props;

    const { rects, boundingRect } = position;

    return (
      <div
        className={`Highlight ${styles.highlight} ${isScrolledTo ? styles.scrolledTo : ""}`}
      >
        {comment ? (
          <div
            className={`Highlight__emoji ${styles.emoji}`}
            style={{
              left: 20,
              top: boundingRect.top,
            }}
          >
            {comment.emoji}
          </div>
        ) : null}
        <div className={`Highlight__parts ${styles.parts}`}>
          {rects.map((rect, index) => (
            <div
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
              onClick={onClick}
              // biome-ignore lint/suspicious/noArrayIndexKey: We can use position hash at some point in future
              key={index}
              style={rect}
              className={`Highlight__part ${styles.part}`}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Highlight;
