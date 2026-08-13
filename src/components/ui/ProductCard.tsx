import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTilt3D } from "@/lib/useTilt3D";
import { SpecTag } from "@/components/ui/SpecTag";
import { ProductImagePlaceholder } from "@/components/ui/ProductImagePlaceholder";
import type { Product } from "@/data/products";

const WHATSAPP_NUMBER = "5210000000000"; // mismo número que WhatsAppFloat.tsx

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const { ref, rotateX, rotateY, onPointerMove, onPointerLeave } = useTilt3D<HTMLElement>(5);

  const quoteHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola, quiero cotizar: ${product.title}`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      style={{ perspective: 1000 }}
    >
      <motion.article
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{ rotateX, rotateY }}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-graphite-900 transition-colors duration-300 hover:border-glass-400/25"
      >
        {/* Imagen del producto */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {failedSrc === product.image ? (
            <ProductImagePlaceholder title={product.title} />
          ) : (
            <img
              key={product.image}
              src={product.image}
              alt={product.title}
              loading="lazy"
              onError={() => setFailedSrc(product.image)}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          )}

          {/* Barrido de luz al hover */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

          {/* Legibilidad */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-graphite-950/90 to-transparent" />

          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {product.specs.slice(0, 2).map((spec) => (
              <SpecTag key={spec}>{spec}</SpecTag>
            ))}
          </div>
        </div>

        {/* Contenido */}
        <div style={{ transform: "translateZ(30px)" }} className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-lg font-semibold leading-snug text-aluminum-100">
            {product.title}
          </h3>
          <p className="mt-2.5 flex-1 font-body text-sm leading-relaxed text-steel-300">
            {product.description}
          </p>

          {product.specs.length > 2 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.specs.slice(2).map((spec) => (
                <SpecTag key={spec}>{spec}</SpecTag>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to={`/simulador/${product.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-glass-400/30 bg-glass-400/10 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-glass-300 transition-colors hover:border-glass-400/50 hover:text-aluminum-100"
            >
              Simula en tu casa
              <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <a
              href={quoteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-amber-400 transition-colors hover:text-amber-300"
            >
              Cotizar este modelo
              <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
