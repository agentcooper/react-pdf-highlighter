import React, { Component } from "react";

interface Props {
  onMoveAway: () => void;
  paddingX: number;
  paddingY: number;
  children: JSX.Element;
}

class MouseMonitor extends Component<Props> {
  container: HTMLDivElement | null = null;
  unsubscribe = () => {};

  onMouseMove = (event: MouseEvent) => {
    if (!this.container) {
      return;
    }

    const { onMoveAway, paddingX, paddingY } = this.props;

    const { clientX, clientY } = event;

    // TODO: see if possible to optimize
    const { left, top, width, height } = this.container.getBoundingClientRect();

    const inBoundsX =
      clientX > left - paddingX && clientX < left + width + paddingX;
    const inBoundsY =
      clientY > top - paddingY && clientY < top + height + paddingY;

    const isNear = inBoundsX && inBoundsY;

    if (!isNear) {
      onMoveAway();
    }
  };

  attachRef = (ref: HTMLDivElement | null) => {
    this.container = ref;
    this.unsubscribe();

    if (ref) {
      const { ownerDocument: doc } = ref;
      doc.addEventListener("mousemove", this.onMouseMove);
      this.unsubscribe = () => {
        doc.removeEventListener("mousemove", this.onMouseMove);
      };
    }
  };

  render() {
    // eslint-disable-next-line
    const { onMoveAway, paddingX, paddingY, children, ...restProps } =
      this.props;

    return (
      <div ref={this.attachRef}>{React.cloneElement(children, restProps)}</div>
    );
  }
}

export default MouseMonitor;
