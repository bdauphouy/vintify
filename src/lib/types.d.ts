export interface Product {
  id: number;
  title: string;
  images: string[];
  price: string;
  vendor: string;
  description: string;
}

export interface ShopifyProduct {
  Handle: string;
  Title: string;
  "Body (HTML)": string;
  Vendor: string;
  Published: string;
  "Variant Price": string;
  "Variant Taxable": string;
  "Image Src": string;
  "Image Position": number;
  "SEO Title": string;
  "SEO Description": string;
  Status: string;
}

export type ExportFormat = "json" | "csv-for-shopify";
