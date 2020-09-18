import React, { Component } from "react";
import Tip from "./Tip";

import "../style/ContextMenu.css";

type State = {
  showMenu: boolean
};

type Props = {
  onConfirm: (comment: { text: string, emoji: string }) => void,
  onOpen: () => void
};

class ContextMenu extends Component<Props, State> {
  state: State = {
    showMenu: false
  };

  handleContextMenu = e => {
    e.preventDefault();
    this.setState.showMenu = true;
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
    const { showMenu } = this.state;
    const { onConfirm, onOpen, clientPosition, position } = this.props;

    const page =
      clientPosition &&
      clientPosition.viewer &&
      clientPosition.viewer.getPageView(position.pageNumber - 1).div;
    const topOffset = page && Math.abs(page.getBoundingClientRect().top);
    console.log("page", page);

    // if (showMenu)
    return (
      <Tip
        onOpen={onOpen}
        onConfirm={onConfirm}
        style={
          clientPosition && {
            top: clientPosition.yPos + topOffset + (page && page.offsetTop),
            left: clientPosition.xPos,
            position: "absolute"
          }
        }
      />
    );
    // else return null;
  }
}

export default ContextMenu;
