export function slugify(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function makeUniqueSlug(baseTitle, existingSlugs) {
  const base = slugify(baseTitle) || "propiedad";
  let slug = base;
  let counter = 2;
  while (existingSlugs.includes(slug)) {
    slug = `${base}-${counter}`;
    counter += 1;
  }
  return slug;
}
