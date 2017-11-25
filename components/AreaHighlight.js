"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRnd = require("react-rnd");

var _reactRnd2 = _interopRequireDefault(_reactRnd);

require("../style/AreaHighlight.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AreaHighlight = function (_Component) {
  _inherits(AreaHighlight, _Component);

  function AreaHighlight() {
    _classCallCheck(this, AreaHighlight);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  AreaHighlight.prototype.render = function render() {
    var _props = this.props,
        highlight = _props.highlight,
        onChange = _props.onChange,
        otherProps = _objectWithoutProperties(_props, ["highlight", "onChange"]);

    return _react2.default.createElement(_reactRnd2.default, _extends({
      className: "AreaHighlight",
      onDragStop: function onDragStop(_, ui) {
        var boundingRect = _extends({}, highlight.position.boundingRect, ui.position);

        onChange(boundingRect);
      },
      onResizeStop: function onResizeStop(direction, styleSize, clientSize, delta, position) {
        var boundingRect = _extends({}, styleSize, {
          top: position.y,
          left: position.x
        });

        onChange(boundingRect);
      },
      initial: {
        x: highlight.position.boundingRect.left,
        y: highlight.position.boundingRect.top,
        width: highlight.position.boundingRect.width,
        height: highlight.position.boundingRect.height
      },
      onClick: function onClick(event) {
        event.stopPropagation();
        event.preventDefault();
      }
    }, otherProps));
  };

  return AreaHighlight;
}(_react.Component);

exports.default = AreaHighlight;
module.exports = exports["default"];