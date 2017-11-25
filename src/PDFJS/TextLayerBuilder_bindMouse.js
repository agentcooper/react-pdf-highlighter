var EXPAND_DIVS_TIMEOUT = 0;

/*
direct copy from
node_modules/pdfjs-dist/web/pdf_viewer.js
*/

function TextLayerBuilder_bindMouse() {
  var div = this.textLayerDiv;
  var self = this;
  var expandDivsTimer = null;
  div.addEventListener("mousedown", function(e) {
    if (self.enhanceTextSelection && self.textLayerRenderTask) {
      self.textLayerRenderTask.expandTextDivs(true);
      if (expandDivsTimer) {
        clearTimeout(expandDivsTimer);
        expandDivsTimer = null;
      }
      return;
    }
    var end = div.querySelector(".endOfContent");
    if (!end) {
      return;
    }
    var adjustTop = e.target !== div;
    adjustTop =
      adjustTop &&
      window.getComputedStyle(end).getPropertyValue("-moz-user-select") !==
        "none";
    if (adjustTop) {
      var divBounds = div.getBoundingClientRect();
      var r = Math.max(0, (e.pageY - divBounds.top) / divBounds.height);
      end.style.top = (r * 100).toFixed(2) + "%";
    }
    end.classList.add("active");
  });
  div.addEventListener("mouseup", function(e) {
    if (self.enhanceTextSelection && self.textLayerRenderTask) {
      expandDivsTimer = setTimeout(function() {
        if (self.textLayerRenderTask) {
          self.textLayerRenderTask.expandTextDivs(false);
        }
        expandDivsTimer = null;
      }, EXPAND_DIVS_TIMEOUT);
      return;
    }
    var end = div.querySelector(".endOfContent");
    if (!end) {
      return;
    }
    end.style.top = "";
    end.classList.remove("active");
  });
}

export default TextLayerBuilder_bindMouse;
