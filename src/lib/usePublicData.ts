import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, type CategoryData, type Product } from "@/data/products";
import { POSTS, type Post } from "@/data/posts";
import { publicFetch } from "@/lib/api";

interface ApiCategory extends Omit<CategoryData, "products"> {}
interface ApiProduct extends Product {
  categorySlug: string;
}
interface ApiPost extends Post {
  status?: string;
}

const CATEGORY_ACCENT_MAP: Record<string, string> = {
  "canceles-de-bano": "from-glass-400/25 via-graphite-800 to-graphite-900",
  "ventanas-puertas": "from-amber-500/20 via-graphite-800 to-graphite-900",
  "barandales-portones": "from-steel-400/25 via-graphite-800 to-graphite-900",
  "muebles-a-medida": "from-glass-300/20 via-graphite-800 to-graphite-900",
};

const POST_ACCENT_MAP: Record<string, string> = {
  "fachadas-muro-cortina": "from-glass-400/30 to-graphite-900",
  "mantenimiento-canceles-bano": "from-amber-500/25 to-graphite-900",
  "dvh-vs-vidrio-simple": "from-steel-400/25 to-graphite-900",
  "vidrio-proyectos-residenciales": "from-cyan-500/20 to-graphite-900",
  "checklist-instalacion": "from-violet-500/20 to-graphite-900",
  "precision-perfiles": "from-emerald-500/20 to-graphite-900",
};

export function usePublicCategories() {
  const [categories, setCategories] = useState<CategoryData[]>(CATEGORIES);

  useEffect(() => {
    Promise.all([publicFetch<ApiCategory[]>("/public/categories"), publicFetch<ApiProduct[]>("/public/products")])
      .then(([apiCategories, apiProducts]) => {
        setCategories(
          apiCategories.map((category) => ({
            ...category,
            accent: CATEGORY_ACCENT_MAP[category.slug] ?? category.accent,
            products: apiProducts
              .filter((product) => product.categorySlug === category.slug)
              .map(({ slug, title, description, image, specs, simulationPrompt }) => ({ slug, title, description, image, specs, simulationPrompt })),
          }))
        );
      })
      .catch(() => undefined);
  }, []);

  return categories;
}

export function usePublicCategory(slug: string | undefined) {
  const categories = usePublicCategories();
  return useMemo(() => categories.find((category) => category.slug === slug), [categories, slug]);
}

export function usePublicPosts() {
  const [posts, setPosts] = useState<Post[]>(POSTS);

  useEffect(() => {
    publicFetch<ApiPost[]>("/public/blog")
      .then((apiPosts) => setPosts(apiPosts.map(({ slug, category, title, excerpt, accent, content }) => ({ slug, category, title, excerpt, accent: POST_ACCENT_MAP[slug] ?? accent, content }))))
      .catch(() => undefined);
  }, []);

  return posts;
}

