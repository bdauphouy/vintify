import type { Product, ShopifyProduct } from "./types";
import slugify from "slugify";
import { json2csv } from "json-2-csv";

export const checkProfileUrl = (url: string) => {
  const regex = new RegExp(
    /^(https?:\/\/)?(www\.)?vinted\.fr\/member\/([a-zA-Z0-9_-]+)\/?$/,
  );

  if (!regex.test(url)) {
    throw new Error("Invalid profile URL.");
  }

  return url.match(regex)![3];
};

export const getProducts = async (id: string) => {
  try {
    const response = await fetch(`/api/products/${id}`);

    const data = await response.json();

    return data.products;
  } catch (error) {
    throw new Error("Failed to fetch products.");
  }
};

export const generateShopifyCSV = (products: Product[]) => {
  const shopifyProducts: ShopifyProduct[] = [];

  for (const product of products) {
    for (let i = 0; i < product.images.length; i++) {
      const handle = slugify(product.title);

      if (i === 0) {
        shopifyProducts.push({
          Handle: handle,
          Title: product.title,
          "Body (HTML)": product.description,
          Vendor: product.vendor,
          Published: "true",
          "Variant Price": Number(product.price).toString(),
          "Variant Taxable": "true",
          "Image Src": product.images[i],
          "Image Position": i + 1,
          "SEO Title": product.title,
          "SEO Description": product.description,
          Status: "active",
        });
      } else {
        shopifyProducts.push({
          "Image Src": product.images[i],
          "Image Position": i + 1,
          Handle: handle,
          Title: "",
          "Body (HTML)": "",
          Vendor: "",
          Published: "",
          "Variant Price": "",
          "Variant Taxable": "",
          "SEO Title": "",
          "SEO Description": "",
          Status: "",
        });
      }
    }
  }

  return json2csv(shopifyProducts);
};

export const downloadCSV = (csv: string) => {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "vintify-products.csv";
  a.click();
};

export const downloadJSON = (json: string) => {
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "vintify-products.json";
  a.click();
};
