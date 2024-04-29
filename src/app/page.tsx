import { db } from "@/server/db";
import { getMyImages } from "@/server/queries";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

async function Images() {
  const images = await getMyImages();
  return (
    <>
      <h1>Images</h1>
      <ul>
        {images.map((image) => (
          <li key={image.id} className="w-48">
            <Link href={`/img/${image.id}`}>
              <Image
                src={image.url}
                alt={image.name}
                style={{ objectFit: "contain" }}
                width={192}
                height={192}
              />
            </Link>
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
