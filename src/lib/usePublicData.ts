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

export function usePublicCategories() {
  const [categories, setCategories] = useState<CategoryData[]>(CATEGORIES);

  useEffect(() => {
    Promise.all([publicFetch<ApiCategory[]>("/public/categories"), publicFetch<ApiProduct[]>("/public/products")])
      .then(([apiCategories, apiProducts]) => {
        setCategories(
          apiCategories.map((category) => ({
            ...category,
            products: apiProducts
              .filter((product) => product.categorySlug === category.slug)
              .map(({ slug, title, description, image, specs }) => ({ slug, title, description, image, specs })),
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
      .then((apiPosts) => setPosts(apiPosts.map(({ slug, category, title, excerpt, accent, content }) => ({ slug, category, title, excerpt, accent, content }))))
      .catch(() => undefined);
  }, []);

  return posts;
}

