// @flow

export type T_LTWH = {
  left: number,
  top: number,
  width: number,
  height: number
};

export type T_Scaled = {
  x1: number,
  y1: number,

  x2: number,
  y2: number,

  width: number,
  height: number
};

export type T_Position = {
  boundingRect: T_LTWH,
  rects: Array<T_LTWH>,
  pageNumber: number
};

export type T_ScaledPosition = {
  boundingRect: T_Scaled,
  rects: Array<T_Scaled>,
  pageNumber: number,
  usePdfCoordinates?: boolean
};

export type T_Content = {
  text?: string,
  image?: string
};

export type T_HighlightContent = {
  content: T_Content
};

export type T_Comment = {
  text: string,
  emoji: string
};
export type T_HighlightComment = {
  comment: T_Comment
};

export type T_NewHighlight = {
  position: T_ScaledPosition
} & T_HighlightContent &
  T_HighlightComment;

export type T_Highlight = { id: string } & T_NewHighlight;

export type T_ViewportHighlight = {
  position: T_Position
} & T_HighlightContent &
  T_HighlightComment;

export type T_VIEWPORT = {
  convertToPdfPoint: (x: number, y: number) => Array<number>,
  convertToViewportRectangle: (pdfRectangle: Array<number>) => Array<number>,
  width: number,
  height: number
};

export type T_EventBus = {
  on: (eventName: string, callback: () => void) => void,
  off: (eventName: string, callback: () => void) => void
};

export type T_PDFJS_Viewer = {
  container: HTMLDivElement,
  viewer: HTMLDivElement,
  getPageView: (
    page: number
  ) => {
    textLayer: { textLayerDiv: HTMLDivElement },
    viewport: T_VIEWPORT,
    div: HTMLDivElement,
    canvas: HTMLCanvasElement
  },
  setDocument: (document: T_PDFJS_Document) => Promise<void>,
  scrollPageIntoView: (options: {
    pageNumber: number,
    destArray: Array<mixed>
  }) => void,
  currentScaleValue: string
};

export type T_PDFJS_Document = {
  destroy: () => void,
  numPages: number
};

export type T_PDFJS_LinkService = {
  setDocument: (document: Object) => void,
  setViewer: (viewer: T_PDFJS_Viewer) => void
};

export type T_PDFJS = {
  TextLayerBuilder: {
    prototype: {
      _bindMouse: () => void
    }
  },
  PDFViewer: (options: Object) => T_PDFJS_Viewer,
  PDFLinkService: () => T_PDFJS_LinkService,
  getDocument: (url: string) => Promise<T_PDFJS_Document>,
  disableWorker: boolean
};
