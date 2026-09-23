import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { MaskData, UploadedImage } from "@/lib/types/simulation";
import { UploadStep } from "./UploadStep";
import { loadImageDimensions } from "@/lib/simulationUtils";
import { PaintStep } from "./PaintStep";

interface PhotoSimulatorProps {
  simulationPrompt?: string;
}

export function PhotoSimulator({ simulationPrompt }: PhotoSimulatorProps) {
  const [image, setImage] = useState<UploadedImage | null>(null);

  async function handleImageSelected(file: File) {
    const url = URL.createObjectURL(file);
    try {
      const { width, height } = await loadImageDimensions(url);
      setImage({ file, url, width, height });
    } catch {
      URL.revokeObjectURL(url);
    }
  }

  function handleChangePhoto() {
    if (image) URL.revokeObjectURL(image.url);
    setImage(null);
  }

  function handleSimulate(mask: MaskData) {
    // Todavía no hay backend / servicio de generación de imagen conectado.
    // Este log confirma que la máscara (a resolución original) se generó bien.
    console.log("Máscara generada:", { width: mask.width, height: mask.height, simulationPrompt });
  }

  return (
    <AnimatePresence mode="wait">
      {image ? (
        <PaintStep key="paint" image={image} onChangePhoto={handleChangePhoto} onSimulate={handleSimulate} />
      ) : (
        <UploadStep key="upload" onImageSelected={handleImageSelected} />
      )}
    </AnimatePresence>
  );
}
