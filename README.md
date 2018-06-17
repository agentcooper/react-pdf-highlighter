## react-pdf-highlighter

`react-pdf-highlighter` provides annotation experience for PDF documents on web
built on top of PDF.js. Text and rectangular highlights are supported. Highlight
data format is independent of the viewport, making it suitable for saving on the
server.

### Demo

https://agentcooper.github.io/react-pdf-highlighter/

### Installation

`npm install react-pdf-highlighter`

### Example

See
[`demo/src/App.js`](https://github.com/agentcooper/react-pdf-highlighter/blob/master/demo/src/App.js)
for React component API example.

While docs are in progress, feel free to check the source annotated with Flow
type signatures.

### Prior art

[`react-pdf`](https://github.com/wojtekmaj/react-pdf) and
[`react-pdfjs`](https://github.com/erikras/react-pdfjs) only provide React
wrappers for PDF.js and do not have built-in annotation functionality.

[`pdfjs-annotate`](https://github.com/instructure/pdf-annotate.js/) does not
provide text highlights out of the box.

PDF.js provides only viewer:

> [PDF.js is mainly written for reading PDF files, not editing them. Because of that we don't yet support adding any kind of annotations. We do however support rendering a number of annotation types for viewing.](https://github.com/mozilla/pdf.js/wiki/Frequently-Asked-Questions#is-it-possible-to-add-annotations-to-a-pdf)

See also:

* https://github.com/mozilla/pdf.js
* https://github.com/wojtekmaj/react-pdf
* https://github.com/erikras/react-pdfjs
* https://github.com/instructure/pdf-annotate.js/
* https://blogs.dropbox.com/tech/2016/11/annotations-on-document-previews/

### FAQ

##### Can I get a new PDF with the highlights embedded into the document?
No, but [pdf-annotation-service](https://github.com/agentcooper/pdf-annotation-service) might be helpful for you.

### Compatibility

Works in Google Chrome, Safari 10+, Firefox 52+. Not tested in Internet
Explorer.
