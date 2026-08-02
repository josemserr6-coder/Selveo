import { SITE_URL } from "@/lib/constants";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/panel-selveo", "/api"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
