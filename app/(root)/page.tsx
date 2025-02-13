import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
// import { db } from "@/database/drizzle";
// import { users } from "@/database/schema";
import React from "react";

const Home = async () => {
  // const result = await db.select().from(users);
  return (
    <>
      {/* <h1 className="text-white">{JSON.stringify(result)}</h1> */}
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      ></BookList>
    </>
  );
};

export default Home;
