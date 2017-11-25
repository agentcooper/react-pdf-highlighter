## react-pdf-annotator

```
npm install react-pdf-annotator
```

`react-pdf-annotator` provides annotation experience for PDF documents on web
built on top of PDF.js. Text and rectangular highlights are supported. Highlight
data format is independent of the viewport, making it suitable for saving on the
server.

### Example and API

See `demo/src/App.js` for public API usage example.

While docs are in progress, feel free to check the source annotated with Flow
type signatures.

### Prior art

[`react-pdf`](https://github.com/wojtekmaj/react-pdf) and
[`react-pdfjs`](https://github.com/erikras/react-pdfjs) do not have built-in
annotation functionality.
[`pdf-annotate.js/`](https://github.com/instructure/pdf-annotate.js/) does not
provide text highlights out of the box.

PDF.js provides only viewer:

> [PDF.js is mainly written for reading PDF files, not editing them. Because of that we don't yet support adding any kind of annotations. We do however support rendering a number of annotation types for viewing.](https://github.com/mozilla/pdf.js/wiki/Frequently-Asked-Questions#is-it-possible-to-add-annotations-to-a-pdf)

* https://github.com/mozilla/pdf.js
* https://github.com/wojtekmaj/react-pdf
* https://github.com/erikras/react-pdfjs
* https://github.com/instructure/pdf-annotate.js/
* https://blogs.dropbox.com/tech/2016/11/annotations-on-document-previews/

### Compatibility

Works in Google Chrome, Safari 10+, Firefox 52+. Not tested in Internet
Explorer.
