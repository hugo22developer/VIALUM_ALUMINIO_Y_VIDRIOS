import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, PencilBrush, Rect, type FabricObject } from "fabric";
import type { DrawingMode, MaskData, UploadedImage } from "@/lib/types/simulation";
import { computeFitDimensions, generateMaskFromCanvas } from "@/lib/simulationUtils";
import { SimulationToolbar } from "./SimulationToolbar";

interface PaintStepProps {
  image: UploadedImage;
  onChangePhoto: () => void;
  onSimulate: (mask: MaskData) => void;
  isSimulating?: boolean;
}

const BOX_WIDTH_FALLBACK = 480;
const BOX_HEIGHT = 380;
const BRUSH_COLOR = "rgba(245, 166, 35, 0.55)";

function getClientPoint(e: MouseEvent | TouchEvent) {
  if ("touches" in e && e.touches.length > 0) {
    return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
  }
  const mouseEvent = e as MouseEvent;
  return { clientX: mouseEvent.clientX, clientY: mouseEvent.clientY };
}

export function PaintStep({ image, onChangePhoto, onSimulate, isSimulating = false }: PaintStepProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const canvasElRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<FabricCanvas | null>(null);
  const displaySizeRef = useRef({ width: 0, height: 0 });

  const [fitted, setFitted] = useState(() =>
    computeFitDimensions(image.width, image.height, BOX_WIDTH_FALLBACK, BOX_HEIGHT)
  );

  const [mode, setMode] = useState<DrawingMode>("brush");
  const [brushSize, setBrushSize] = useState(24);
  const [hasDrawing, setHasDrawing] = useState(false);

  // Mide el contenedor ANTES de pintar en pantalla (useLayoutEffect, no
  // useEffect) para no mostrar un tamaño incorrecto ni por un instante.
  useLayoutEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const boxWidth = outer.clientWidth || BOX_WIDTH_FALLBACK;
    const next = computeFitDimensions(image.width, image.height, boxWidth, BOX_HEIGHT);
    setFitted(next);
    displaySizeRef.current = next;
  }, [image.width, image.height]);

  // Fabric.js NUNCA dibuja la fotografía — solo actúa como capa de
  // anotación transparente encima de una <img> normal (ver JSX). Esto
  // elimina de raíz el bug de buffer corrupto que veníamos arrastrando:
  // al no depender de que Fabric escale/posicione ninguna imagen, ese bug
  // ya no tiene dónde ocurrir.
  useEffect(() => {
    const canvasEl = canvasElRef.current;
    if (!canvasEl || fitted.width === 0) return;

    const canvas = new FabricCanvas(canvasEl, {
      width: fitted.width,
      height: fitted.height,
      selection: false,
      backgroundColor: "transparent",
      enableRetinaScaling: false,
    });
    fabricRef.current = canvas;

    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush.color = BRUSH_COLOR;
    canvas.freeDrawingBrush.width = brushSize;
    canvas.isDrawingMode = true;

    function syncHasDrawing() {
      setHasDrawing(canvas.getObjects().length > 0);
    }
    canvas.on("path:created", syncHasDrawing);
    canvas.on("object:added", syncHasDrawing);
    canvas.on("object:removed", syncHasDrawing);

    return () => {
      void canvas.dispose();
      fabricRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitted.width, fitted.height]);

  useEffect(() => {
    if (fabricRef.current?.freeDrawingBrush) {
      fabricRef.current.freeDrawingBrush.width = brushSize;
    }
  }, [brushSize]);

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    canvas.isDrawingMode = mode === "brush";
  }, [mode]);

  useEffect(() => {
    const canvas = fabricRef.current;
    const canvasEl = canvasElRef.current;
    if (!canvas || !canvasEl || mode !== "rectangle") return;

    function getScaledPoint(nativeEvent: MouseEvent | TouchEvent) {
      const rect = canvasEl!.getBoundingClientRect();
      const scaleX = canvasEl!.width / rect.width;
      const scaleY = canvasEl!.height / rect.height;
      const { clientX, clientY } = getClientPoint(nativeEvent);
      return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
    }

    let start: { x: number; y: number } | null = null;
    let rect: Rect | null = null;

    function handleDown(opt: { e: MouseEvent | TouchEvent }) {
      const point = getScaledPoint(opt.e);
      start = point;
      rect = new Rect({
        left: point.x,
        top: point.y,
        width: 0,
        height: 0,
        fill: "rgba(245, 166, 35, 0.35)",
        stroke: "rgba(245, 166, 35, 0.9)",
        strokeWidth: 1,
        selectable: false,
        evented: false,
      });
      canvas!.add(rect);
    }

    function handleMove(opt: { e: MouseEvent | TouchEvent }) {
      if (!start || !rect) return;
      const point = getScaledPoint(opt.e);
      rect.set({
        left: Math.min(start.x, point.x),
        top: Math.min(start.y, point.y),
        width: Math.abs(point.x - start.x),
        height: Math.abs(point.y - start.y),
      });
      canvas!.renderAll();
    }

    function handleUp() {
      if (rect && ((rect.width ?? 0) < 2 || (rect.height ?? 0) < 2)) {
        canvas!.remove(rect);
      }
      start = null;
      rect = null;
      setHasDrawing(canvas!.getObjects().length > 0);
    }

    canvas.on("mouse:down", handleDown as never);
    canvas.on("mouse:move", handleMove as never);
    canvas.on("mouse:up", handleUp);
    return () => {
      canvas.off("mouse:down", handleDown as never);
      canvas.off("mouse:move", handleMove as never);
      canvas.off("mouse:up", handleUp);
    };
  }, [mode]);

  function handleClear() {
    const canvas = fabricRef.current;
    if (!canvas) return;
    canvas.getObjects().slice().forEach((obj: FabricObject) => canvas.remove(obj));
    canvas.renderAll();
    setHasDrawing(false);
  }

  function handleSimulate() {
    const canvas = fabricRef.current;
    if (!canvas || !hasDrawing) return;
    const mask = generateMaskFromCanvas({
      fabricCanvas: canvas,
      originalWidth: image.width,
      originalHeight: image.height,
      displayWidth: displaySizeRef.current.width,
    });
    onSimulate(mask);
  }

  return (
    <motion.div
      key="paint-step"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="flex flex-col gap-4"
    >
      <div
        ref={outerRef}
        className="relative flex h-[380px] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-graphite-950/70"
      >
        {fitted.width > 0 && (
          <div className="relative" style={{ width: fitted.width, height: fitted.height }}>
            {/* La foto: una <img> normal, sin Fabric de por medio. */}
            <img
              src={image.url}
              alt=""
              width={fitted.width}
              height={fitted.height}
              className="absolute inset-0 h-full w-full rounded-xl object-cover"
              draggable={false}
            />
            {/* Fabric solo pinta aquí encima, en un canvas transparente. */}
            <canvas ref={canvasElRef} className="absolute inset-0 rounded-xl" />
          </div>
        )}
        {isSimulating ? (
          <div className="absolute inset-0 flex items-center justify-center bg-graphite-950/70 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3 text-aluminum-100">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-glass-300/25 border-t-amber-500" />
              <span className="font-mono text-xs uppercase tracking-[0.24em]">Generando simulacion</span>
            </div>
          </div>
        ) : null}
      </div>

      <SimulationToolbar
        mode={mode}
        onModeChange={setMode}
        brushSize={brushSize}
        onBrushSizeChange={setBrushSize}
        onClear={handleClear}
        onChangePhoto={onChangePhoto}
        onSimulate={handleSimulate}
        canSimulate={hasDrawing}
        isSimulating={isSimulating}
      />
    </motion.div>
  );
}
