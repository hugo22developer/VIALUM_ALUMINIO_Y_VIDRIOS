import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CategoryHero } from "@/components/ui/CategoryHero";
import { ProductCard } from "@/components/ui/ProductCard";
import { usePublicCategories, usePublicCategory } from "@/lib/usePublicData";

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const categories = usePublicCategories();
  const category = usePublicCategory(slug);

  useEffect(() => {
    if (category) document.title = `${category.label} · Vitral Alum`;
  }, [category]);

  if (!category) return <Navigate to="/" replace />;

  const otherCategories = categories.filter((c) => c.slug !== category.slug);

  return (
    <>
      <CategoryHero category={category} />

      <section className="bg-graphite-950 pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {category.products.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Navegación cruzada a las otras 3 líneas */}
      <section className="border-t border-white/10 bg-graphite-950 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="mb-6 font-display text-lg font-semibold text-aluminum-100"
          >
            Explora otras líneas
          </motion.h2>
          <div className="flex flex-wrap gap-3">
            {otherCategories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  to={`/catalogo/${cat.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-graphite-900 px-5 py-2.5 font-body text-sm text-steel-300 transition-colors hover:border-glass-400/40 hover:text-aluminum-100"
                >
                  {cat.shortLabel}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
