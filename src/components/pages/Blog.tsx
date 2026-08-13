import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SpecTag } from "@/components/ui/SpecTag";
import { usePublicPosts } from "@/lib/usePublicData";

export function Blog() {
  const posts = usePublicPosts();
  return (
    <section id="blog" className="relative bg-graphite-950 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-xl">
            <SpecTag>Blog</SpecTag>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-aluminum-100 sm:text-4xl">
              Notas desde el taller
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden items-center gap-1.5 font-body text-sm text-steel-300 transition-colors hover:text-glass-400 sm:flex"
          >
            Ver todos los artículos <ArrowRight size={15} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <Link key={post.title} to={`/blog/${post.slug}`} className="contents">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-graphite-900"
              >
                <div className={`relative h-44 bg-gradient-to-br ${post.accent}`}>
                  <div className="blueprint-grid absolute inset-0 opacity-40" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-graphite-950/70 px-3 py-1 font-mono text-[11px] tracking-wide text-glass-300 backdrop-blur">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-base font-semibold leading-snug text-aluminum-100 transition-colors group-hover:text-glass-300">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-steel-300">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-amber-400">
                    Leer más
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
