import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SpecTag } from "@/components/ui/SpecTag";
import { usePublicPosts } from "@/lib/usePublicData";

export function BlogPage() {
  const posts = usePublicPosts();
  return (
    <section className="relative bg-graphite-950 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <SpecTag>Blog</SpecTag>
            <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-aluminum-100 sm:text-4xl">
              Artículos y guías de diseño y ejecución
            </h1>
            <p className="mt-4 font-body text-base leading-relaxed text-steel-300">
              Explora ideas, recomendaciones técnicas y casos reales para tomar decisiones más precisas en cada proyecto.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-graphite-900 px-4 py-2 font-body text-sm text-steel-300 transition-colors hover:border-glass-400/40 hover:text-aluminum-100"
          >
            <ArrowLeft size={15} />
            Volver a la página principal
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-graphite-900"
            >
              <div className={`relative h-44 bg-gradient-to-br ${post.accent}`}>
                <div className="blueprint-grid absolute inset-0 opacity-40" />
                <span className="absolute bottom-4 left-4 rounded-full bg-graphite-950/70 px-3 py-1 font-mono text-[11px] tracking-wide text-glass-300 backdrop-blur">
                  {post.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-lg font-semibold leading-snug text-aluminum-100 transition-colors group-hover:text-glass-300">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-steel-300">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-amber-400 transition-colors hover:text-amber-300"
                >
                  Leer más
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
