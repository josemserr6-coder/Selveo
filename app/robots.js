export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/panel-selveo", "/api"],
    },
  };
}
