import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { images } = await request.json();

    const formData = new FormData();
    formData.append("image", images[0]);

    return json({ images });
  } catch (error) {
    return json({ error: (error as Error).message }, { status: 500 });
  }
};
