import { dummyBooks } from "@/dummy_books";
import ImageKit from "imagekit";
import { books } from "./schema";
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

const uploadToImageKit = async (url: string, fileName: string, folder: string) => {
  try {
    const imagekit = new ImageKit({
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    });

    const response = await imagekit.upload({
      file: url,
      fileName: fileName,
      folder,
    });

    console.log('uploaded to imagekit', response.filePath);
    return response.filePath;
  } catch (error) {
    console.error('Error uploading to ImageKit:', error);

  }
};
const seed = async () => {
  console.log('Seeding data...');
  try {
    for (const book of dummyBooks) {
      const coverUrl = await uploadToImageKit(book.coverUrl, `${book.title}.jpg`, '/books/covers') as string;

      const videoUrl = await uploadToImageKit(book.videoUrl, `${book.title}.mp4`, '/books/videos') as string;

      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl,
      });
    }

  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seed();