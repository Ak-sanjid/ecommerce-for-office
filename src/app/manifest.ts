import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GLOW Beauty",
    short_name: "GLOW",
    description: "Premium Beauty & Personal Care — Bangladesh",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF8F3",
    theme_color: "#C9A45C",
    orientation: "portrait",
    icons: [
      { src: "/icons/pwa-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/pwa-512.png", sizes: "512x512", type: "image/png" },
    ],
    categories: ["shopping", "lifestyle"],
  };
}
