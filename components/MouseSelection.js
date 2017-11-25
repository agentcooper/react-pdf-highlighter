"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("../style/MouseSelection.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MouseSelection = function (_Component) {
  _inherits(MouseSelection, _Component);

  function MouseSelection() {
    var _temp, _this, _ret;

    _classCallCheck(this, MouseSelection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      locked: false,
      start: null,
      end: null
    }, _this.reset = function () {
      var onDragEnd = _this.props.onDragEnd;


      onDragEnd();
      _this.setState({ start: null, end: null, locked: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MouseSelection.prototype.getBoundingRect = function getBoundingRect(start, end) {
    return {
      left: Math.min(end.x, start.x),
      top: Math.min(end.y, start.y),

      width: Math.abs(end.x - start.x),
      height: Math.abs(end.y - start.y)
    };
  };

  MouseSelection.prototype.componentDidUpdate = function componentDidUpdate() {
    var onChange = this.props.onChange;
    var _state = this.state,
        start = _state.start,
        end = _state.end;


    var isVisible = Boolean(start && end);

    onChange(isVisible);
  };

  MouseSelection.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (!this.root) {
      return;
    }

    var that = this;

    var _props = this.props,
        onSelection = _props.onSelection,
        onDragStart = _props.onDragStart,
        onDragEnd = _props.onDragEnd,
        shouldStart = _props.shouldStart;


    var container = this.root.parentElement;

    if (!(container instanceof HTMLElement)) {
      return;
    }

    var containerBoundingRect = null;

    var containerCoords = function containerCoords(pageX, pageY) {
      if (!containerBoundingRect) {
        containerBoundingRect = container.getBoundingClientRect();
      }

      return {
        x: pageX - containerBoundingRect.left + container.scrollLeft,
        y: pageY - containerBoundingRect.top + container.scrollTop
      };
    };

    container.addEventListener("mousemove", function (event) {
      var _state2 = _this2.state,
          start = _state2.start,
          locked = _state2.locked;


      if (!start || locked) {
        return;
      }

      that.setState(_extends({}, _this2.state, {
        end: containerCoords(event.pageX, event.pageY)
      }));
    });

    container.addEventListener("mousedown", function (event) {
      if (!shouldStart(event)) {
        _this2.reset();
        return;
      }

      var startTarget = event.target;

      if (!(startTarget instanceof HTMLElement)) {
        return;
      }

      onDragStart();

      _this2.setState({
        start: containerCoords(event.pageX, event.pageY),
        end: null,
        locked: false
      });

      var onMouseUp = function onMouseUp(event) {
        // emulate listen once
        event.currentTarget.removeEventListener("mouseup", onMouseUp);

        var start = _this2.state.start;


        if (!start) {
          return;
        }

        var end = containerCoords(event.pageX, event.pageY);

        var boundingRect = that.getBoundingRect(start, end);

        if (!(event.target instanceof HTMLElement) || !container.contains(event.target) || !that.shouldRender(boundingRect)) {
          that.reset();
          return;
        }

        that.setState({
          end: end,
          locked: true
        }, function () {
          var _that$state = that.state,
              start = _that$state.start,
              end = _that$state.end;


          if (!start || !end) {
            return;
          }

          if (event.target instanceof HTMLElement) {
            onSelection(startTarget, boundingRect, that.reset);

            onDragEnd();
          }
        });
      };

      if (document.body) {
        document.body.addEventListener("mouseup", onMouseUp);
      }
    });
  };

  MouseSelection.prototype.shouldRender = function shouldRender(boundingRect) {
    return boundingRect.width >= 1 && boundingRect.height >= 1;
  };

  MouseSelection.prototype.render = function render() {
    var _this3 = this;

    var _state3 = this.state,
        start = _state3.start,
        end = _state3.end;


    return _react2.default.createElement(
      "div",
      {
        className: "MouseSelection-container",
        ref: function ref(node) {
          return _this3.root = node;
        }
      },
      start && end ? _react2.default.createElement("div", {
        className: "MouseSelection",
        style: this.getBoundingRect(start, end)
      }) : null
    );
  };

  return MouseSelection;
}(_react.Component);

exports.default = MouseSelection;
module.exports = exports["default"];