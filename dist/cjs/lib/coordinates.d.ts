import type { LTWH, Scaled, Viewport } from "../types";
interface WIDTH_HEIGHT {
    width: number;
    height: number;
}
export declare const viewportToScaled: (rect: LTWH, { width, height }: WIDTH_HEIGHT) => Scaled;
export declare const scaledToViewport: (scaled: Scaled, viewport: Viewport, usePdfCoordinates?: boolean) => LTWH;
export {};
