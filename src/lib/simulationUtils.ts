import type { Canvas as FabricCanvas } from "fabric";
import type { FitDimensions, MaskData } from "./types/simulation";

export const MAX_SIMULATION_DIMENSION = 1024;

/**
 * Calcula las dimensiones a las que una imagen debe renderizarse para caber
 * por completo dentro de un contenedor de tamaño fijo, preservando su
 * aspect ratio original. Nunca hace crecer el contenedor: es la imagen la
 * que se adapta al espacio disponible.
 */
export function computeFitDimensions(
  naturalWidth: number,
  naturalHeight: number,
  maxWidth: number,
  maxHeight: number,
): FitDimensions {
  if (!naturalWidth || !naturalHeight || !maxWidth || !maxHeight) {
    return { width: maxWidth, height: maxHeight };
  }

  const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight);

  return {
    width: Math.max(1, Math.round(naturalWidth * scale)),
    height: Math.max(1, Math.round(naturalHeight * scale)),
  };
}

/**
 * Lee las dimensiones naturales de una imagen a partir de su URL (por
 * ejemplo, un object URL generado con URL.createObjectURL).
 */
export function loadImageDimensions(url: string): Promise<FitDimensions> {
  return new Promise((resolve, reject) => {
    const probe = new Image();
    probe.onload = () => resolve({ width: probe.naturalWidth, height: probe.naturalHeight });
    probe.onerror = () => reject(new Error("No se pudo leer la imagen."));
    probe.src = url;
  });
}

interface GenerateMaskParams {
  fabricCanvas: FabricCanvas;
  originalWidth: number;
  originalHeight: number;
  displayWidth: number;
}

/**
 * Genera la máscara final a partir de lo dibujado en el canvas: una imagen
 * JPEG en Base64, a la resolución original de la foto (no la del canvas en
 * pantalla), con las zonas marcadas por el usuario en blanco sobre fondo
 * negro.
 *
 * Reutiliza el propio canvas de Fabric para el export (con `multiplier`),
 * ocultando temporalmente la foto de fondo y pintando de blanco los trazos
 * del usuario, restaurando todo después, en vez de reimplementar el
 * escalado de trazos a mano.
 */
export function generateMaskFromCanvas({ 
  fabricCanvas, 
  originalWidth, 
  originalHeight, 
  displayWidth 
}: GenerateMaskParams): MaskData {
  const targetWidth = Math.min(originalWidth, MAX_SIMULATION_DIMENSION);
  const targetHeight = Math.min(
    originalHeight,
    Math.round((originalHeight / originalWidth) * targetWidth),
  );
  const multiplier = displayWidth > 0 ? targetWidth / displayWidth : 1;

  const objects = fabricCanvas.getObjects();
  const previousStyles = objects.map((obj) => ({ fill: obj.fill, stroke: obj.stroke }));
  const previousBackgroundColor = fabricCanvas.backgroundColor;

  fabricCanvas.backgroundColor = "#000000";
  objects.forEach((obj) => obj.set({ fill: "#ffffff", stroke: "#ffffff" }));
  fabricCanvas.renderAll();

  const base64 = fabricCanvas.toDataURL({ format: "jpeg", quality: 0.75, multiplier });

  fabricCanvas.backgroundColor = previousBackgroundColor;
  objects.forEach((obj, index) => obj.set(previousStyles[index]));
  fabricCanvas.renderAll();

  return { base64, width: targetWidth, height: targetHeight };
}

/** 
 * Redimensiona una imagen a un tamaño exacto usando un canvas nativo,
 * devolviendo un blob URL de la versión ya escalada. Evita depender del
 * scaleX/scaleY de Fabric, que es donde sospechamos el bug real. 
 */
export function resizeImageToExactSize(sourceUrl: string, targetWidth: number, targetHeight: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Sin contexto 2D"));
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error("No se pudo generar el blob"));
        resolve(URL.createObjectURL(blob));
      }, "image/png");
    };
    img.onerror = () => reject(new Error("No se pudo cargar la imagen fuente"));
    img.src = sourceUrl;
  });
}