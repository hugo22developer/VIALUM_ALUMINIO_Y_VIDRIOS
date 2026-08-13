import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { SpecTag } from "@/components/ui/SpecTag";
import { usePublicPosts } from "@/lib/usePublicData";

export function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const posts = usePublicPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <section className="relative bg-graphite-950 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-graphite-900 px-4 py-2 font-body text-sm text-steel-300 transition-colors hover:border-glass-400/40 hover:text-aluminum-100"
          >
            <ArrowLeft size={15} />
            Volver al blog
          </Link>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-graphite-900"
        >
          <div className={`relative h-56 bg-gradient-to-br ${post.accent}`}>
            <div className="blueprint-grid absolute inset-0 opacity-40" />
            <div className="absolute bottom-6 left-6">
              <SpecTag>{post.category}</SpecTag>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-aluminum-100 sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-steel-300 sm:text-lg">
              {post.content}
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
