import { getProperties, getDevelopments } from "@/lib/store";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 0;

export default async function sitemap() {
  const [properties, developments] = await Promise.all([
    getProperties(),
    getDevelopments(),
  ]);

  const propertyEntries = properties.map((property) => ({
    url: `${SITE_URL}/propiedades/${property.slug}`,
    lastModified: property.createdAt ? new Date(property.createdAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const developmentEntries = developments.map((development) => ({
    url: `${SITE_URL}/desarrollos/${development.slug}`,
    lastModified: development.createdAt ? new Date(development.createdAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...propertyEntries,
    ...developmentEntries,
  ];
}
