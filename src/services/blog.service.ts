import { env } from "@/env";

const API_URL = env.API_URL;

interface GetBlogParams {
  isFeatured?: boolean;
  search?: string;
}
interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export const blogService = {
  getBlogPosts: async function (
    params?: GetBlogParams,
    options?: ServiceOptions,
  ) {
    try {
      // no dynamic and no {cache: on-store} :SSG ==> Static Page
      // { cache: no-store} : SSR ==> Dynamic page
      // next: { revalidate: 10} : ISR ==> Mix between static and dynamic

      const url = new URL(`${API_URL}/posts`);

      // url.searchParams.append("key", "value");

      // console.log(Object.entries(params));

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
