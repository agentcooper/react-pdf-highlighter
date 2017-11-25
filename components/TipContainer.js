"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var clamp = function clamp(value, left, right) {
  return Math.min(Math.max(value, left), right);
};

var TipContainer = function (_Component) {
  _inherits(TipContainer, _Component);

  function TipContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, TipContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      height: 0,
      width: 0
    }, _this.updatePosition = function () {
      var container = _this.refs.container;
      var offsetHeight = container.offsetHeight,
          offsetWidth = container.offsetWidth;


      _this.setState({
        height: offsetHeight,
        width: offsetWidth
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  TipContainer.prototype.componentDidUpdate = function componentDidUpdate(nextProps) {
    if (this.props.children !== nextProps.children) {
      this.updatePosition();
    }
  };

  TipContainer.prototype.componentDidMount = function componentDidMount() {
    setTimeout(this.updatePosition, 0);
  };

  TipContainer.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        children = _props.children,
        style = _props.style,
        scrollTop = _props.scrollTop,
        pageBoundingRect = _props.pageBoundingRect;
    var _state = this.state,
        height = _state.height,
        width = _state.width;


    var isStyleCalculationInProgress = width === 0 && height === 0;

    var shouldMove = style.top - height - 5 < scrollTop;

    var top = shouldMove ? style.bottom + 5 : style.top - height - 5;

    var left = clamp(style.left - width / 2, 0, pageBoundingRect.width - width);

    var childrenWithProps = _react2.default.Children.map(children, function (child) {
      return _react2.default.cloneElement(child, {
        onUpdate: function onUpdate() {
          _this2.setState({
            width: 0,
            height: 0
          }, function () {
            setTimeout(_this2.updatePosition, 0);
          });
        },
        popup: {
          position: shouldMove ? "below" : "above"
        }
      });
    });

    return _react2.default.createElement(
      "div",
      {
        className: "PdfAnnotator__tip-container",
        style: {
          visibility: isStyleCalculationInProgress ? "hidden" : "visible",
          top: top,
          left: left
        },
        ref: "container"
      },
      childrenWithProps
    );
  };

  return TipContainer;
}(_react.Component);

exports.default = TipContainer;
module.exports = exports["default"];