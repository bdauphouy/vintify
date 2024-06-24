import type { Image } from "$lib/types";
import { writable } from "svelte/store";

type Product = {
  id: string;
  images: Image[];
  title: string;
  price: string;
};

export const createdProducts = writable<Product[]>([]);
