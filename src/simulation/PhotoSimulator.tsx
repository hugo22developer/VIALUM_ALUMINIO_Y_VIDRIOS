import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { simulateProduct } from "@/lib/api";
import type { MaskData, UploadedImage } from "@/lib/types/simulation";
import { loadImageDimensions, MAX_SIMULATION_DIMENSION } from "@/lib/simulationUtils";
import { PaintStep } from "./PaintStep";
import { UploadStep } from "./UploadStep";

interface PhotoSimulatorProps {
  productId?: string;
  onSimulationComplete?: (simulationUrl: string, originalUrl: string) => void;
}

function imageToJpegDataUrl(image: UploadedImage): Promise<string> {
  return new Promise((resolve, reject) => {
    const source = new Image();
    source.onload = () => {
      const scale = Math.min(
        1,
        MAX_SIMULATION_DIMENSION / Math.max(image.width, image.height),
      );
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("No se pudo preparar la foto."));
        return;
      }
      context.drawImage(source, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.75));
    };
    source.onerror = () => reject(new Error("No se pudo leer la foto."));
    source.src = image.url;
  });
}

export function PhotoSimulator({ productId, onSimulationComplete }: PhotoSimulatorProps) {
  const [image, setImage] = useState<UploadedImage | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleImageSelected(file: File) {
    const url = URL.createObjectURL(file);
    try {
      const { width, height } = await loadImageDimensions(url);
      setImage({ file, url, width, height });
      setError(null);
    } catch {
      URL.revokeObjectURL(url);
      setError("No se pudo leer la foto. Intenta con otra imagen.");
    }
  }

  function handleChangePhoto() {
    if (image) URL.revokeObjectURL(image.url);
    setImage(null);
    setError(null);
  }

  async function handleSimulate(mask: MaskData) {
    if (!image || !productId) {
      setError("Selecciona un producto valido para generar la simulacion.");
      return;
    }

    setIsSimulating(true);
    setError(null);
    try {
      const clientImageBase64 = await imageToJpegDataUrl(image);
      const result = await simulateProduct({
        productId,
        clientImageBase64,
        maskBase64: mask.base64,
      });
      onSimulationComplete?.(result.simulationUrl, image.url);
    } catch {
      setError("No se pudo generar la simulacion. Intentalo de nuevo.");
    } finally {
      setIsSimulating(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <AnimatePresence mode="wait">
        {image ? (
          <PaintStep
            key="paint"
            image={image}
            onChangePhoto={handleChangePhoto}
            onSimulate={handleSimulate}
            isSimulating={isSimulating}
          />
        ) : (
          <UploadStep key="upload" onImageSelected={handleImageSelected} />
        )}
      </AnimatePresence>

      {error ? (
        <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 font-body text-sm text-red-100">
          {error}
        </div>
      ) : null}
    </div>
  );
}
