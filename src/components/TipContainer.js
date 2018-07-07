// @flow

import React, { Component } from "react";

import type { T_LTWH } from "../types";

type State = {
  height: number,
  width: number
};

type Props = {
  children: ?React$Element<*>,
  style: { top: number, left: number, bottom: number },
  scrollTop: number,
  pageBoundingRect: T_LTWH
};

const clamp = (value, left, right) => Math.min(Math.max(value, left), right);

class TipContainer extends Component<Props, State> {
  state = {
    height: 0,
    width: 0
  };

  state: State;
  props: Props;

  componentDidUpdate(nextProps: Props) {
    if (this.props.children !== nextProps.children) {
      this.updatePosition();
    }
  }

  componentDidMount() {
    setTimeout(this.updatePosition, 0);
  }

  updatePosition = () => {
    const { container } = this.refs;

    const { offsetHeight, offsetWidth } = container;

    this.setState({
      height: offsetHeight,
      width: offsetWidth
    });
  };

  render() {
    const { children, style, scrollTop, pageBoundingRect } = this.props;

    const { height, width } = this.state;

    const isStyleCalculationInProgress = width === 0 && height === 0;

    const shouldMove = style.top - height - 5 < scrollTop;

    const top = shouldMove ? style.bottom + 5 : style.top - height - 5;

    const left = clamp(
      style.left - width / 2,
      0,
      pageBoundingRect.width - width
    );

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        onUpdate: () => {
          this.setState(
            {
              width: 0,
              height: 0
            },
            () => {
              setTimeout(this.updatePosition, 0);
            }
          );
        },
        popup: {
          position: shouldMove ? "below" : "above"
        }
      })
    );

    return (
      <div
        className="PdfHighlighter__tip-container"
        style={{
          visibility: isStyleCalculationInProgress ? "hidden" : "visible",
          top,
          left
        }}
        ref="container"
      >
        {childrenWithProps}
      </div>
    );
  }
}

export default TipContainer;
