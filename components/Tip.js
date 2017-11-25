"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("../style/Tip.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tip = function (_Component) {
  _inherits(Tip, _Component);

  function Tip() {
    var _temp, _this, _ret;

    _classCallCheck(this, Tip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      compact: true,
      text: "",
      emoji: ""
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // for TipContainer
  Tip.prototype.componentDidUpdate = function componentDidUpdate(nextProps, nextState) {
    var onUpdate = this.props.onUpdate;


    if (onUpdate && this.state.compact !== nextState.compact) {
      onUpdate();
    }
  };

  Tip.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        onConfirm = _props.onConfirm,
        onOpen = _props.onOpen;
    var _state = this.state,
        compact = _state.compact,
        text = _state.text,
        emoji = _state.emoji;


    return _react2.default.createElement(
      "div",
      { className: "Tip" },
      compact ? _react2.default.createElement(
        "div",
        {
          className: "Tip__compact",
          onClick: function onClick() {
            onOpen();
            _this2.setState({ compact: false });
          }
        },
        "Add highlight"
      ) : _react2.default.createElement(
        "form",
        {
          className: "Tip__card",
          onSubmit: function onSubmit(event) {
            event.preventDefault();
            onConfirm({ text: text, emoji: emoji });
          }
        },
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement("textarea", {
            width: "100%",
            placeholder: "Your comment",
            autoFocus: true,
            value: text,
            onChange: function onChange(event) {
              return _this2.setState({ text: event.target.value });
            },
            ref: function ref(node) {
              if (node) {
                node.focus();
              }
            }
          }),
          _react2.default.createElement(
            "div",
            null,
            ["💩", "😱", "😍", "🔥", "😳", "⚠️"].map(function (_emoji) {
              return _react2.default.createElement(
                "label",
                { key: _emoji },
                _react2.default.createElement("input", {
                  checked: emoji === _emoji,
                  type: "radio",
                  name: "emoji",
                  value: _emoji,
                  onChange: function onChange(event) {
                    return _this2.setState({ emoji: event.target.value });
                  }
                }),
                _emoji
              );
            })
          )
        ),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement("input", { type: "submit", value: "Save" })
        )
      )
    );
  };

  return Tip;
}(_react.Component);

exports.default = Tip;
module.exports = exports["default"];