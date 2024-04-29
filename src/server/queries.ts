import "server-only"
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getMyImages(){

  const {userId} = auth()

  if(!userId) throw new Error("Not authenticated")

    const images = await db.query.images.findMany({
      where: (model, {eq}) => eq(model.userId, userId),
        orderBy: (model, { desc }) => desc(model.createdAt),
      });
        return images
}

export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}