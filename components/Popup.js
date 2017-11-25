"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _MouseMonitor = require("./MouseMonitor");

var _MouseMonitor2 = _interopRequireDefault(_MouseMonitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popup = function (_Component) {
  _inherits(Popup, _Component);

  function Popup() {
    var _temp, _this, _ret;

    _classCallCheck(this, Popup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      mouseIn: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Popup.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        onMouseOver = _props.onMouseOver,
        popupContent = _props.popupContent,
        onMouseOut = _props.onMouseOut;


    return _react2.default.createElement(
      "div",
      {
        onMouseOver: function (_onMouseOver) {
          function onMouseOver() {
            return _onMouseOver.apply(this, arguments);
          }

          onMouseOver.toString = function () {
            return _onMouseOver.toString();
          };

          return onMouseOver;
        }(function () {
          _this2.setState({ mouseIn: true });

          onMouseOver(_react2.default.createElement(_MouseMonitor2.default, {
            onMoveAway: function onMoveAway() {
              if (_this2.state.mouseIn) {
                return;
              }

              onMouseOut();
            },
            paddingX: 60,
            paddingY: 30,
            children: popupContent
          }));
        }),
        onMouseOut: function onMouseOut() {
          _this2.setState({ mouseIn: false });
        }
      },
      this.props.children
    );
  };

  return Popup;
}(_react.Component);

exports.default = Popup;
module.exports = exports["default"];