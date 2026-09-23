import { motion } from "framer-motion";
import { ImagePlus, Sparkles } from "lucide-react";
import { useRef, useState, type ChangeEvent, type DragEvent } from "react";

interface UploadStepProps {
  onImageSelected: (file: File) => void;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export function UploadStep({ onImageSelected }: UploadStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFile(file: File | undefined) {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Sube una imagen en formato JPG o PNG.");
      return;
    }
    setError(null);
    onImageSelected(file);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleFile(event.target.files?.[0]);
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  }

  return (
    <motion.div
      key="upload-step"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="flex h-[380px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-graphite-950/70 p-8 text-center"
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div
        className={`rounded-full border p-4 text-glass-300 transition-colors ${
          isDragging ? "border-glass-400/60 bg-glass-400/10" : "border-white/10 bg-white/5"
        }`}
      >
        <ImagePlus size={24} />
      </div>
      <p className="mt-5 max-w-xs font-body text-sm text-steel-300">
        Arrastra una foto de tu espacio aquí, o selecciónala desde tu equipo.
      </p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-glass-400/30 bg-glass-400/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-glass-300 transition-colors hover:border-glass-400/50 hover:bg-glass-400/20"
      >
        <Sparkles size={13} />
        Subir foto
      </button>
      {error ? <p className="mt-4 font-body text-xs text-red-400">{error}</p> : null}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={handleInputChange}
      />
    </motion.div>
  );
}
