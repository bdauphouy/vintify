import { vinted } from "$lib/api/index";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
  const { id } = params;

  try {
    const products = await vinted.getProducts(id);

    return json({ products });
  } catch (error) {
    return json({ error: (error as Error).message }, { status: 500 });
  }
};
