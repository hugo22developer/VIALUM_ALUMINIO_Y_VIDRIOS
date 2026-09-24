import { ImageOff } from "lucide-react";

/** Se muestra cuando producto aun no tiene imagen remota disponible. */
export function ProductImagePlaceholder({ title }: { title: string }) {
  return (
    <div className="blueprint-grid absolute inset-0 flex flex-col items-center justify-center gap-2 bg-graphite-800">
      <ImageOff size={22} className="text-steel-600" strokeWidth={1.5} />
      <span className="max-w-[70%] text-center font-mono text-[11px] leading-snug text-steel-600">
        {title}
      </span>
    </div>
  );
}
