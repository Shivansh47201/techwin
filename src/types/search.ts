export type SearchResult = {
  type: "product" | "application" | "category";
  title: string;
  slug?: string;
  category?: string;
  description?: string;
  image?: string;
  url: string;
};
