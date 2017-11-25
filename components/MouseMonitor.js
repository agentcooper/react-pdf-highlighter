"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MouseMonitor = function (_Component) {
  _inherits(MouseMonitor, _Component);

  function MouseMonitor() {
    var _temp, _this, _ret;

    _classCallCheck(this, MouseMonitor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onMouseMove = function (event) {
      if (!_this.container) {
        return;
      }

      var _this$props = _this.props,
          onMoveAway = _this$props.onMoveAway,
          paddingX = _this$props.paddingX,
          paddingY = _this$props.paddingY;
      var clientX = event.clientX,
          clientY = event.clientY;

      // TODO: see if possible to optimize

      var _this$container$getBo = _this.container.getBoundingClientRect(),
          left = _this$container$getBo.left,
          top = _this$container$getBo.top,
          width = _this$container$getBo.width,
          height = _this$container$getBo.height;

      var inBoundsX = clientX > left - paddingX && clientX < left + width + paddingX;
      var inBoundsY = clientY > top - paddingY && clientY < top + height + paddingY;

      var isNear = inBoundsX && inBoundsY;

      if (!isNear) {
        onMoveAway();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MouseMonitor.prototype.componentDidMount = function componentDidMount() {
    document.addEventListener("mousemove", this.onMouseMove);
  };

  MouseMonitor.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener("mousemove", this.onMouseMove);
  };

  MouseMonitor.prototype.render = function render() {
    var _this2 = this;

    // eslint-disable-next-line
    var _props = this.props,
        onMoveAway = _props.onMoveAway,
        paddingX = _props.paddingX,
        paddingY = _props.paddingY,
        restProps = _objectWithoutProperties(_props, ["onMoveAway", "paddingX", "paddingY"]);

    return _react2.default.createElement(
      "div",
      { ref: function ref(node) {
          return _this2.container = node;
        } },
      _react2.default.cloneElement(this.props.children, restProps)
    );
  };

  return MouseMonitor;
}(_react.Component);

exports.default = MouseMonitor;
module.exports = exports["default"];