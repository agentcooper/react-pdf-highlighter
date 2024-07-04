import { Page } from "../types";
export declare const getDocument: (elm: any) => Document;
export declare const getWindow: (elm: any) => typeof window;
export declare const isHTMLElement: (elm: any) => boolean;
export declare const isHTMLCanvasElement: (elm: any) => boolean;
export declare const asElement: (x: any) => HTMLElement;
export declare const getPageFromElement: (target: HTMLElement) => Page | null;
export declare const getPagesFromRange: (range: Range) => Page[];
export declare const findOrCreateContainerLayer: (container: HTMLElement, className: string) => Element;
