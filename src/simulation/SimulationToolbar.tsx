import { Brush, RefreshCcw, Square, Trash2, Wand2 } from "lucide-react";
import type { DrawingMode } from "@/lib/types/simulation";

interface SimulationToolbarProps {
  mode: DrawingMode;
  onModeChange: (mode: DrawingMode) => void;
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
  onClear: () => void;
  onChangePhoto: () => void;
  onSimulate: () => void;
  canSimulate: boolean;
  isSimulating?: boolean;
}

export function SimulationToolbar({
  mode,
  onModeChange,
  brushSize,
  onBrushSizeChange,
  onClear,
  onChangePhoto,
  onSimulate,
  canSimulate,
  isSimulating = false,
}: SimulationToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-graphite-900/60 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onModeChange("brush")}
            disabled={isSimulating}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
              mode === "brush"
                ? "border-glass-400/50 bg-glass-400/15 text-aluminum-100"
                : "border-white/10 text-steel-300 hover:border-white/20"
            }`}
          >
            <Brush size={13} />
            Pincel
          </button>
          <button
            type="button"
            onClick={() => onModeChange("rectangle")}
            disabled={isSimulating}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
              mode === "rectangle"
                ? "border-glass-400/50 bg-glass-400/15 text-aluminum-100"
                : "border-white/10 text-steel-300 hover:border-white/20"
            }`}
          >
            <Square size={13} />
            Rectángulo
          </button>
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={isSimulating}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-steel-300 transition-colors hover:border-white/20 hover:text-aluminum-100"
        >
          <Trash2 size={13} />
          Limpiar
        </button>
      </div>

      {mode === "brush" ? (
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel-400">Grosor</span>
          <input
            type="range"
            min={6}
            max={60}
            value={brushSize}
            onChange={(event) => onBrushSizeChange(Number(event.target.value))}
            className="h-1 flex-1 cursor-pointer accent-amber-500"
          />
          <span className="w-9 text-right font-mono text-[10px] text-steel-400">{brushSize}px</span>
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={onChangePhoto}
          disabled={isSimulating}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-steel-300 transition-colors hover:border-white/20 hover:text-aluminum-100"
        >
          <RefreshCcw size={13} />
          Cambiar foto
        </button>

        <button
          type="button"
          onClick={onSimulate}
          disabled={!canSimulate || isSimulating}
          className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-graphite-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Wand2 size={14} />
          {isSimulating ? "Generando..." : "Simular en mi casa"}
        </button>
      </div>
    </div>
  );
}
