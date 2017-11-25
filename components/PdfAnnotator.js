"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _pdfjsDist = require("pdfjs-dist");

require("pdfjs-dist/web/pdf_viewer.css");

require("../style/pdf_viewer.css");

require("../style/PdfAnnotator.css");

var _getBoundingRect = require("../lib/get-bounding-rect");

var _getBoundingRect2 = _interopRequireDefault(_getBoundingRect);

var _getClientRects = require("../lib/get-client-rects");

var _getClientRects2 = _interopRequireDefault(_getClientRects);

var _getAreaAsPng = require("../lib/get-area-as-png");

var _getAreaAsPng2 = _interopRequireDefault(_getAreaAsPng);

var _pdfjsDom = require("../lib/pdfjs-dom");

var _TextLayerBuilder_bindMouse = require("../PDFJS/TextLayerBuilder_bindMouse");

var _TextLayerBuilder_bindMouse2 = _interopRequireDefault(_TextLayerBuilder_bindMouse);

var _TipContainer = require("./TipContainer");

var _TipContainer2 = _interopRequireDefault(_TipContainer);

var _MouseSelection = require("./MouseSelection");

var _MouseSelection2 = _interopRequireDefault(_MouseSelection);

var _coordinates = require("../lib/coordinates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("pdfjs-dist/web/pdf_viewer");

// @FIXME: hack
_pdfjsDist.PDFJS.TextLayerBuilder.prototype._bindMouse = _TextLayerBuilder_bindMouse2.default;

_pdfjsDist.PDFJS.disableWorker = true;

var CLICK_TIMEOUT = 300;
var EMPTY_ID = "empty-id";

var clickTimeoutId = 0;

var PdfAnnotator = function (_Component) {
  _inherits(PdfAnnotator, _Component);

  function PdfAnnotator() {
    var _temp, _this, _ret;

    _classCallCheck(this, PdfAnnotator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      ghostHighlight: null,
      isCollapsed: true,
      range: null,
      scrolledToHighlightId: EMPTY_ID
    }, _this.viewer = null, _this.containerNode = null, _this.hideTipAndSelection = function () {
      var tipNode = (0, _pdfjsDom.findOrCreateContainerLayer)(_this.viewer.viewer, "PdfAnnotator__tip-layer");

      _reactDom2.default.unmountComponentAtNode(tipNode);

      _this.setState({ ghostHighlight: null, tip: null }, function () {
        return _this.renderHighlights();
      });
    }, _this.onTextLayerRendered = function () {
      _this.renderHighlights();
    }, _this.scrollTo = function (highlight) {
      var _highlight$position = highlight.position,
          pageNumber = _highlight$position.pageNumber,
          boundingRect = _highlight$position.boundingRect,
          usePdfCoordinates = _highlight$position.usePdfCoordinates;


      _this.viewer.container.removeEventListener("scroll", _this.onScroll);

      var pageViewport = _this.viewer.getPageView(pageNumber - 1).viewport;

      var scrollMargin = 10;

      _this.viewer.scrollPageIntoView({
        pageNumber: pageNumber,
        destArray: [null, { name: "XYZ" }].concat(pageViewport.convertToPdfPoint(0, (0, _coordinates.scaledToViewport)(boundingRect, pageViewport, usePdfCoordinates).top - scrollMargin), [0])
      });

      _this.setState({
        scrolledToHighlightId: highlight.id
      }, function () {
        return _this.renderHighlights();
      });

      // wait for scrolling to finish
      setTimeout(function () {
        _this.viewer.container.addEventListener("scroll", _this.onScroll);
      }, 100);
    }, _this.onDocumentReady = function () {
      var scrollRef = _this.props.scrollRef;


      _this.viewer.currentScaleValue = "auto";

      scrollRef(_this.scrollTo);
    }, _this.onSelectionChange = function () {
      var selection = window.getSelection();

      if (selection.isCollapsed) {
        _this.setState({ isCollapsed: true });
        return;
      }

      var range = selection.getRangeAt(0);

      if (!range) {
        return;
      }

      _this.setState({
        isCollapsed: false,
        range: range
      });
    }, _this.onScroll = function () {
      var onScrollChange = _this.props.onScrollChange;


      onScrollChange();

      _this.setState({
        scrolledToHighlightId: EMPTY_ID
      }, function () {
        return _this.renderHighlights();
      });

      _this.viewer.container.removeEventListener("scroll", _this.onScroll);
    }, _this.onMouseDown = function (event) {
      if (!(event.target instanceof HTMLElement)) {
        return;
      }

      if (event.target.closest(".PdfAnnotator__tip-container")) {
        return;
      }

      _this.hideTipAndSelection();

      // let single click go through
      clickTimeoutId = setTimeout(function () {
        return _this.setState({ isMouseDown: true });
      }, CLICK_TIMEOUT);
    }, _this.handleKeyDown = function (event) {
      if (event.code === "Escape") {
        _this.hideTipAndSelection();
      }
    }, _this.onMouseUp = function () {
      clearTimeout(clickTimeoutId);
      _this.setState({ isMouseDown: false });

      var onSelectionFinished = _this.props.onSelectionFinished;
      var _this$state = _this.state,
          isCollapsed = _this$state.isCollapsed,
          range = _this$state.range;


      if (!range || isCollapsed) {
        return;
      }

      var page = (0, _pdfjsDom.getPageFromRange)(range);

      if (!page) {
        return;
      }

      var rects = (0, _getClientRects2.default)(range, page.node);

      if (rects.length === 0) {
        return;
      }

      var boundingRect = (0, _getBoundingRect2.default)(rects);

      var viewportPosition = { boundingRect: boundingRect, rects: rects, pageNumber: page.number };

      var content = {
        text: range.toString()
      };

      var scaledPosition = _this.viewportPositionToScaled(viewportPosition);

      _this.renderTipAtPosition(viewportPosition, onSelectionFinished(scaledPosition, content, function () {
        return _this.hideTipAndSelection();
      }, function () {
        return _this.setState({
          ghostHighlight: { position: scaledPosition }
        }, function () {
          return _this.renderHighlights();
        });
      }));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  PdfAnnotator.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.highlights !== nextProps.highlights) {
      this.renderHighlights(nextProps);
    }
  };

  PdfAnnotator.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
    return false;
  };

  PdfAnnotator.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var pdfDocument = this.props.pdfDocument;


    this.linkService = new _pdfjsDist.PDFJS.PDFLinkService();

    this.viewer = new _pdfjsDist.PDFJS.PDFViewer({
      container: this.containerNode,
      enhanceTextSelection: true,
      removePageBorders: true,
      linkService: this.linkService
    });

    this.linkService.setViewer(this.viewer);

    console.log(this.viewer);

    this.viewer.setDocument(pdfDocument);

    this.linkService.setDocument(pdfDocument);

    // debug
    window.PdfViewer = this;

    document.addEventListener("selectionchange", this.onSelectionChange);
    document.addEventListener("keydown", this.handleKeyDown);

    this.containerNode && this.containerNode.addEventListener("pagesinit", function () {
      _this2.onDocumentReady();
    });

    this.containerNode && this.containerNode.addEventListener("textlayerrendered", this.onTextLayerRendered);
    this.containerNode && this.containerNode.addEventListener("mousedown", this.onMouseDown);
  };

  PdfAnnotator.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener("selectionchange", this.onSelectionChange);
    document.removeEventListener("keydown", this.handleKeyDown);

    this.containerNode && this.containerNode.removeEventListener("textlayerrendered", this.onTextLayerRendered);
    this.containerNode && this.containerNode.removeEventListener("mousedown", this.onMouseDown);
  };

  PdfAnnotator.prototype.findOrCreateHighlightLayer = function findOrCreateHighlightLayer(page) {
    var textLayer = this.viewer.getPageView(page - 1).textLayer;

    if (!textLayer) {
      return null;
    }

    return (0, _pdfjsDom.findOrCreateContainerLayer)(textLayer.textLayerDiv, "PdfAnnotator__highlight-layer");
  };

  PdfAnnotator.prototype.groupHighlightsByPage = function groupHighlightsByPage(highlights) {
    var ghostHighlight = this.state.ghostHighlight;


    return [].concat(highlights, [ghostHighlight]).filter(Boolean).reduce(function (res, highlight) {
      var pageNumber = highlight.position.pageNumber;


      res[pageNumber] = res[pageNumber] || [];
      res[pageNumber].push(highlight);

      return res;
    }, {});
  };

  PdfAnnotator.prototype.showTip = function showTip(highlight, content) {
    var _state = this.state,
        isCollapsed = _state.isCollapsed,
        ghostHighlight = _state.ghostHighlight,
        isMouseDown = _state.isMouseDown,
        isAreaSelectionInProgress = _state.isAreaSelectionInProgress;


    var highlightInProgress = !isCollapsed || ghostHighlight;

    if (highlightInProgress || isMouseDown || isAreaSelectionInProgress) {
      return;
    }

    this.renderTipAtPosition(highlight.position, content);
  };

  PdfAnnotator.prototype.scaledPositionToViewport = function scaledPositionToViewport(_ref) {
    var pageNumber = _ref.pageNumber,
        boundingRect = _ref.boundingRect,
        rects = _ref.rects,
        usePdfCoordinates = _ref.usePdfCoordinates;

    var viewport = this.viewer.getPageView(pageNumber - 1).viewport;

    return {
      boundingRect: (0, _coordinates.scaledToViewport)(boundingRect, viewport, usePdfCoordinates),
      rects: (rects || []).map(function (rect) {
        return (0, _coordinates.scaledToViewport)(rect, viewport, usePdfCoordinates);
      }),
      pageNumber: pageNumber
    };
  };

  PdfAnnotator.prototype.viewportPositionToScaled = function viewportPositionToScaled(_ref2) {
    var pageNumber = _ref2.pageNumber,
        boundingRect = _ref2.boundingRect,
        rects = _ref2.rects;

    var viewport = this.viewer.getPageView(pageNumber - 1).viewport;

    return {
      boundingRect: (0, _coordinates.viewportToScaled)(boundingRect, viewport),
      rects: (rects || []).map(function (rect) {
        return (0, _coordinates.viewportToScaled)(rect, viewport);
      }),
      pageNumber: pageNumber
    };
  };

  PdfAnnotator.prototype.screenshot = function screenshot(position, pageNumber) {
    var canvas = this.viewer.getPageView(pageNumber - 1).canvas;

    return (0, _getAreaAsPng2.default)(canvas, position);
  };

  PdfAnnotator.prototype.renderHighlights = function renderHighlights(nextProps) {
    var _this3 = this;

    var _ref3 = nextProps || this.props,
        highlightTransform = _ref3.highlightTransform,
        highlights = _ref3.highlights;

    var pdfDocument = this.props.pdfDocument;
    var _state2 = this.state,
        tip = _state2.tip,
        scrolledToHighlightId = _state2.scrolledToHighlightId;


    var highlightsByPage = this.groupHighlightsByPage(highlights);

    var _loop = function _loop(_pageNumber) {
      var highlightLayer = _this3.findOrCreateHighlightLayer(_pageNumber);

      if (highlightLayer) {
        _reactDom2.default.render(_react2.default.createElement(
          "div",
          null,
          (highlightsByPage[String(_pageNumber)] || []).map(function (highlight, index) {
            var position = highlight.position,
                rest = _objectWithoutProperties(highlight, ["position"]);

            var viewportHighlight = _extends({
              position: _this3.scaledPositionToViewport(position)
            }, rest);

            if (tip && tip.highlight.id === String(highlight.id)) {
              _this3.showTip(tip.highlight, tip.callback(viewportHighlight));
            }

            var isScrolledTo = Boolean(scrolledToHighlightId === highlight.id);

            return highlightTransform(viewportHighlight, index, function (highlight, callback) {
              _this3.setState({
                tip: { highlight: highlight, callback: callback }
              });

              _this3.showTip(highlight, callback(highlight));
            }, _this3.hideTipAndSelection, function (rect) {
              var viewport = _this3.viewer.getPageView(_pageNumber - 1).viewport;

              return (0, _coordinates.viewportToScaled)(rect, viewport);
            }, function (boundingRect) {
              return _this3.screenshot(boundingRect, _pageNumber);
            }, isScrolledTo);
          })
        ), highlightLayer);
      }
    };

    for (var _pageNumber = 1; _pageNumber <= pdfDocument.numPages; _pageNumber++) {
      _loop(_pageNumber);
    }
  };

  PdfAnnotator.prototype.renderTipAtPosition = function renderTipAtPosition(position, inner) {
    var boundingRect = position.boundingRect,
        pageNumber = position.pageNumber;


    var page = {
      node: this.viewer.getPageView(pageNumber - 1).div
    };

    var pageBoundingRect = page.node.getBoundingClientRect();

    var tipNode = (0, _pdfjsDom.findOrCreateContainerLayer)(this.viewer.viewer, "PdfAnnotator__tip-layer");

    _reactDom2.default.render(_react2.default.createElement(_TipContainer2.default, {
      scrollTop: this.viewer.container.scrollTop,
      pageBoundingRect: pageBoundingRect,
      style: {
        left: page.node.offsetLeft + boundingRect.left + boundingRect.width / 2,
        top: boundingRect.top + page.node.offsetTop,
        bottom: boundingRect.top + page.node.offsetTop + boundingRect.height
      },
      children: inner
    }), tipNode);
  };

  PdfAnnotator.prototype.toggleTextSelection = function toggleTextSelection(flag) {
    this.viewer.viewer.classList.toggle("PdfAnnotator--disable-selection", flag);
  };

  PdfAnnotator.prototype.render = function render() {
    var _this4 = this;

    var _props = this.props,
        onSelectionFinished = _props.onSelectionFinished,
        enableAreaSelection = _props.enableAreaSelection;


    return _react2.default.createElement(
      "div",
      {
        ref: function ref(node) {
          return _this4.containerNode = node;
        },
        onMouseUp: function onMouseUp() {
          return setTimeout(_this4.onMouseUp, 0);
        },
        className: "PdfAnnotator"
      },
      _react2.default.createElement("div", { className: "pdfViewer" }),
      typeof enableAreaSelection === "function" ? _react2.default.createElement(_MouseSelection2.default, {
        onDragStart: function onDragStart() {
          return _this4.toggleTextSelection(true);
        },
        onDragEnd: function onDragEnd() {
          return _this4.toggleTextSelection(false);
        },
        onChange: function onChange(isVisible) {
          return _this4.setState({ isAreaSelectionInProgress: isVisible });
        },
        shouldStart: function shouldStart(event) {
          return enableAreaSelection(event) && event.target instanceof HTMLElement && Boolean(event.target.closest(".page"));
        },
        onSelection: function onSelection(startTarget, boundingRect, resetSelection) {
          var page = (0, _pdfjsDom.getPageFromElement)(startTarget);

          if (!page) {
            return;
          }

          var pageBoundingRect = _extends({}, boundingRect, {
            top: boundingRect.top - page.node.offsetTop,
            left: boundingRect.left - page.node.offsetLeft
          });

          var viewportPosition = {
            boundingRect: pageBoundingRect,
            rects: [],
            pageNumber: page.number
          };

          var scaledPosition = _this4.viewportPositionToScaled(viewportPosition);

          var image = _this4.screenshot(pageBoundingRect, page.number);

          _this4.renderTipAtPosition(viewportPosition, onSelectionFinished(scaledPosition, { image: image }, function () {
            return _this4.hideTipAndSelection();
          }, function () {
            return _this4.setState({
              ghostHighlight: {
                position: scaledPosition,
                content: { image: image }
              }
            }, function () {
              resetSelection();
              _this4.renderHighlights();
            });
          }));
        }
      }) : null
    );
  };

  return PdfAnnotator;
}(_react.Component);

exports.default = PdfAnnotator;
module.exports = exports["default"];