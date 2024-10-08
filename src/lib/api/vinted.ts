import type { Product } from "$lib/types";
import { parse } from "cookie";

export class Vinted {
  baseUrl: string;
  cookie?: string;

  constructor() {
    this.baseUrl = "https://www.vinted.fr";
    this.cookie = undefined;
  }

  private async init() {
    const response = await fetch(this.baseUrl);

    try {
      const setCookies = response.headers.getSetCookie();

      if (setCookies) {
        const cookie = setCookies.find((cookie) =>
          cookie.includes("_vinted_fr_session"),
        );

        if (cookie) {
          const parsedCookie = parse(cookie)["_vinted_fr_session"];

          this.cookie = parsedCookie;
        }
      }
    } catch (error) {
      throw new Error("Failed to initialize session.");
    }
  }

  async getProducts(id: string): Promise<Product[]> {
    if (!this.cookie) {
      await this.init();

      return this.getProducts(id);
    }

    const products = [];

    try {
      const fetchPage = async (page: number) => {
        const response = await fetch(
          `${this.baseUrl}/api/v2/users/${id}/items?page=${page}&cond=active&order=relevance`,
          {
            headers: {
              cookie: `_vinted_fr_session=${this.cookie}`,
            },
            method: "GET",
          },
        );

        const data = await response.json();

        return {
          products: data.items,
          pageCount: data.pagination.total_pages,
        };
      };

      const { products: pageOneProducts, pageCount } = await fetchPage(1);

      products.push(...pageOneProducts);

      for (let page = 2; page <= pageCount; page++) {
        const { products: pageProducts } = await fetchPage(page);

        products.push(...pageProducts);
      }

      const formattedProducts = products.map((product, id) => {
        return {
          id,
          title: product.title,
          description: product.description,
          vendor: product.user_login,
          price: Number(product.price_numeric).toString().replace(".", ","),
          images: product.photos.map((photo: { url: string }) => photo.url),
        };
      });

      return formattedProducts;
    } catch {
      throw new Error("Failed to fetch products.");
    }
  }
}
