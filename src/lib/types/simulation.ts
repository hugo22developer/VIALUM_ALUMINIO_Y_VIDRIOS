export type DrawingMode = "brush" | "rectangle";

export interface UploadedImage {
  file: File;
  url: string;
  width: number;
  height: number;
}

export interface MaskData {
  base64: string;
  width: number;
  height: number;
}

export interface FitDimensions {
  width: number;
  height: number;
}