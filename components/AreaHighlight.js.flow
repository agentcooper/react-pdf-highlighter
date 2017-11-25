// @flow

import React, { Component } from "react";

import Rnd from "react-rnd";

import "../style/AreaHighlight.css";

import type { T_ViewportHighlight, T_LTWH } from "../types";

type Props = {
  highlight: T_ViewportHighlight,
  onChange: (rect: T_LTWH) => void
};

class AreaHighlight extends Component<Props> {
  render() {
    const { highlight, onChange, ...otherProps } = this.props;

    return (
      <Rnd
        className="AreaHighlight"
        onDragStop={(_, ui: { position: T_LTWH }) => {
          const boundingRect = {
            ...highlight.position.boundingRect,
            ...ui.position
          };

          onChange(boundingRect);
        }}
        onResizeStop={(direction, styleSize, clientSize, delta, position) => {
          const boundingRect = {
            ...styleSize,
            top: position.y,
            left: position.x
          };

          onChange(boundingRect);
        }}
        initial={{
          x: highlight.position.boundingRect.left,
          y: highlight.position.boundingRect.top,
          width: highlight.position.boundingRect.width,
          height: highlight.position.boundingRect.height
        }}
        onClick={event => {
          event.stopPropagation();
          event.preventDefault();
        }}
        {...otherProps}
      />
    );
  }
}

export default AreaHighlight;
