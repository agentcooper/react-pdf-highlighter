import React, { Component } from "react";

import "../style/ContextMenu.css";

type State = {
  xPos: string,
  yPos: string,
  showMenu: boolean
};

type Props = {
  onConfirm: (comment: { text: string, emoji: string }) => void,
  onOpen: () => void,
  onUpdate?: () => void,
  compact: boolean,
  text: string,
  emoji: string
};

class ContextMenu extends Component<Props, State> {
  state: State = {
    xPos: "0px",
    yPos: "0px",
    showMenu: false
  };

  handleContextMenu = e => {
    e.preventDefault();

    e &&
      this.setState({
        xPos: e.pageX + "px",
        yPos: e.pageY + "px",
        showMenu: true
      });
    console.log("why", e, this.state);
  };

  handleClick = e => {
    console.log("why2", this.state);
    if (this.state.showMenu) {
      this.setState({ showMenu: false });
    }
  };

  componentDidMount() {
    document.addEventListener("click", e => this.handleClick(e));
    document.addEventListener("contextmenu", e => this.handleContextMenu(e));
  }

  componentWillUnmount() {
    //fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
    document.removeEventListener("click", e => this.handleClick(e));
    document.removeEventListener("contextmenu", e => this.handleContextMenu(e));
  }

  render() {
    const { showMenu, xPos, yPos } = this.state;
    const { onConfirm, onOpen, compact, text, emoji } = this.props;

    // if (showMenu)
    return (
      <div className="Tip">
        {compact ? (
          <div
            className="Tip__compact"
            onClick={() => {
              onOpen();
              this.setState({ compact: false });
            }}
            style={{ top: xPos || "563px", left: yPos || "407px" }}
          >
            Add highlightgggggggggg
          </div>
        ) : (
          <form
            className="Tip__card"
            onSubmit={event => {
              event.preventDefault();
              onConfirm({ text, emoji });
            }}
          >
            <div>
              <textarea
                width="100%"
                placeholder="Your comment"
                autoFocus
                value={text}
                onChange={event => this.setState({ text: event.target.value })}
                ref={node => {
                  if (node) {
                    node.focus();
                  }
                }}
              />
              {/* <div>
                    {["💩", "😱", "😍", "🔥", "😳", "⚠️"].map(_emoji => (
                      <label key={_emoji}>
                        <input
                          checked={emoji === _emoji}
                          type="radio"
                          name="emoji"
                          value={_emoji}
                          onChange={event =>
                            this.setState({ emoji: event.target.value })
                          }
                        />
                        {_emoji}
                      </label>
                    ))}
                  </div> */}
            </div>
            <div>
              <input type="submit" value="Save" />
            </div>
          </form>
        )}
      </div>
    );
    // else return null;
  }
}

export default ContextMenu;
