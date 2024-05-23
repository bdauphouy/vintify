import { writable, type Writable } from "svelte/store";

export const selectedProducts = writable<number[]>([]);
