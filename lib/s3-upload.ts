import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: "eu-north-1",
});

export async function uploadImage(image: File) {
  const extension = image.name.split(".").pop();
  const uniqueId = Date.now().toString();
  const fileName = `post-${uniqueId}.${extension}`;
  const bufferedImage = await image.arrayBuffer();

  s3.putObject({
    Bucket: "rvlasenko-nextjs-demo-users-image",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: image.type,
  });

  return fileName;
}
