import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
// import { db } from "@/database/drizzle";
// import { users } from "@/database/schema";
import React from "react";

const Home = async () => {
  const session = await auth();
  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];
  // const result = await db.select().from(users);
  return (
    <>
      {/* <h1 className="text-white">{JSON.stringify(result)}</h1> */}
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />
      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      ></BookList>
    </>
  );
};

export default Home;
