import React, { Component } from "react";
import Tip from "./Tip";

import "../style/ContextMenu.css";

type State = {
  xPos: string,
  yPos: string,
  showMenu: boolean
};

type Props = {
  onConfirm: (comment: { text: string, emoji: string }) => void,
  onOpen: () => void
};

class ContextMenu extends Component<Props, State> {
  state: State = {
    xPos: "0px",
    yPos: "0px",
    showMenu: false
  };

  handleContextMenu = e => {
    e.preventDefault();
    debugger;
    this.setState({
      xPos: e.pageX + "px",
      yPos: e.pageY + "px",
      showMenu: true
    });

    console.log("handleContextMenu", this, e.pageX, this.state);
  };

  handleClick = e => {
    if (this.state.showMenu) {
      this.setState({ showMenu: false });
    }
  };

  componentDidMount() {
    document.addEventListener("click", e => this.handleClick(e));
    document.addEventListener("contextmenu", e => this.handleContextMenu(e));
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
    document.removeEventListener("click", e => this.handleClick(e));
    document.removeEventListener("contextmenu", e => this.handleContextMenu(e));
  }

  render() {
    const { showMenu, xPos, yPos } = this.state;
    const { onConfirm, onOpen } = this.props;

    // if (showMenu)
    return (
      <Tip
        onOpen={onOpen}
        onConfirm={onConfirm}
        style={{
          top: xPos,
          left: yPos,
          position: "absolute"
        }}
      />
    );
    // else return null;
  }
}

export default ContextMenu;
