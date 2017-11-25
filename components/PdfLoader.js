"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _pdfjsDist = require("pdfjs-dist");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PdfLoader = function (_Component) {
  _inherits(PdfLoader, _Component);

  function PdfLoader() {
    var _temp, _this, _ret;

    _classCallCheck(this, PdfLoader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      pdfDocument: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  PdfLoader.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var url = this.props.url;


    _pdfjsDist.PDFJS.getDocument(url).then(function (pdfDocument) {
      console.log("Got!", pdfDocument);
      _this2.setState({
        pdfDocument: pdfDocument
      });
    });
  };

  PdfLoader.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        beforeLoad = _props.beforeLoad;
    var pdfDocument = this.state.pdfDocument;


    if (pdfDocument) {
      return children(pdfDocument);
    }

    return beforeLoad;
  };

  return PdfLoader;
}(_react.Component);

exports.default = PdfLoader;
module.exports = exports["default"];