import { getProperties } from "@/lib/store";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 0;

export default async function sitemap() {
  const properties = await getProperties();

  const propertyEntries = properties.map((property) => ({
    url: `${SITE_URL}/propiedades/${property.slug}`,
    lastModified: property.createdAt ? new Date(property.createdAt) : new Date(),
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
  ];
}
