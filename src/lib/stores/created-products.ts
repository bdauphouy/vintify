import { writable } from "svelte/store";

type Product = {
  id: string;
  images: HTMLImageElement[];
  title: string;
  price: string;
};

export const createdProducts = writable<Product[]>([]);
