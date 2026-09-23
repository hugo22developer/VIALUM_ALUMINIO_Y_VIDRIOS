import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { usePublicCategories } from "@/lib/usePublicData";
import { PhotoSimulator } from "@/simulation";



export function SimulatorPage() {
  const { slug } = useParams<{ slug: string }>();
  const categories = usePublicCategories();

  const product = categories.flatMap((category) => category.products).find((item) => item.slug === slug);

  return (
    <section className="relative bg-graphite-950 py-24 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-glass-300">Simulador visual</p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-aluminum-100 sm:text-4xl">
              {product?.title ?? "Simulación de producto"}
            </h1>
            <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-steel-300 sm:text-base">
              Sube una foto de tu espacio y visualiza cómo se vería este sistema en tu hogar o proyecto.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-graphite-900 px-4 py-2 font-body text-sm text-steel-300 transition-colors hover:border-glass-400/40 hover:text-aluminum-100"
          >
            <ArrowLeft size={15} />
            Volver
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="rounded-3xl border border-white/10 bg-graphite-900 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-glass-300">
              <Sparkles size={16} />
              <span className="font-mono text-xs uppercase tracking-[0.3em]">Tu foto</span>
            </div>

            <div className="mt-6">
              <PhotoSimulator simulationPrompt={product?.simulationPrompt} />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-graphite-900 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-glass-300">
              <Sparkles size={16} />
              <span className="font-mono text-xs uppercase tracking-[0.3em]">Vista previa</span>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-graphite-800 via-graphite-900 to-graphite-950 p-4">
              <div className="flex h-[360px] items-center justify-center rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_38%),linear-gradient(125deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]">
                <div className="w-[85%] rounded-[1.5rem] border border-white/10 bg-graphite-950/60 p-4 backdrop-blur-sm">
                  <div className="h-full min-h-[280px] rounded-[1.1rem] border border-dashed border-white/10 bg-[linear-gradient(110deg,rgba(255,255,255,0.06),transparent_40%,rgba(255,255,255,0.03))] p-4">
                    <div className="flex h-full items-end justify-center rounded-[0.95rem] border border-white/10 bg-graphite-900/70 p-6">
                      <div className="w-full max-w-[220px] rounded-2xl border border-glass-400/20 bg-glass-400/10 px-4 py-5 text-center text-sm leading-relaxed text-steel-300">
                        Aquí se mostrará el resultado de la simulación del producto en tu espacio.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}