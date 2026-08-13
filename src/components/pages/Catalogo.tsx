import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SpecTag } from "@/components/ui/SpecTag";
import type { CategoryData } from "@/data/products";
import { usePublicCategories } from "@/lib/usePublicData";
import { useTilt3D } from "@/lib/useTilt3D";

const MotionLink = motion.create(Link);

export function Catalogo() {
  const categories = usePublicCategories();
  return (
    <section id="catalogo" className="relative bg-graphite-950 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <SpecTag>Catálogo</SpecTag>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-aluminum-100 sm:text-4xl">
            Cuatro líneas, un mismo estándar de precisión
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.slug} index={i} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: CategoryData;
  index: number;
}) {
  const { ref, rotateX, rotateY, onPointerMove, onPointerLeave } = useTilt3D<HTMLAnchorElement>(7);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      style={{ perspective: 1000 }}
    >
      <MotionLink
        to={`/catalogo/${category.slug}`}
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{ rotateX, rotateY }}
        className={`group relative block min-h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${category.accent} p-8`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div style={{ transform: "translateZ(40px)" }} className="relative flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <SpecTag>{category.heroSpecs[0]}</SpecTag>
            <motion.span
              whileHover={{ rotate: 45 }}
              className="rounded-full border border-white/15 p-2 text-aluminum-100"
            >
              <ArrowUpRight size={16} />
            </motion.span>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold text-aluminum-100">{category.label}</h3>
            <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-steel-300">
              {category.heroDescription}
            </p>
          </div>
        </div>
      </MotionLink>
    </motion.div>
  );
}
