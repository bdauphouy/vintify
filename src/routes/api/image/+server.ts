import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY } from "$env/static/private";

const client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

export const POST: RequestHandler = async ({ request }) => {
  const { images } = await request.json();

  for (const image of images) {
    const buffer = Buffer.from(
      image.base64.replace(/^data:image\/\w+;base64,/, ""),
      "base64",
    );

    const command = new PutObjectCommand({
      Bucket: "mirage-vintify",
      Key: image.id + image.format.replace("image/", "."),
      Body: buffer,
    });

    await client.send(command);
  }

  return json({ success: true });
};
