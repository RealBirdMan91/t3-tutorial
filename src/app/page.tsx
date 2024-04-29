import { db } from "@/server/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";

async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  return (
    <>
      <h1>Images</h1>
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <img src={image.url} alt={image.name} className="max-w-[250px]" />
          </li>
        ))}
      </ul>
    </>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
