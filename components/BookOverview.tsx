import React from "react";
import Image from "next/image";
import BookCover from "./BookCover";
import BorrowBook from "./BorrowBook";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

interface Props extends Book {
  userId?: string;
}
const BookOverview = async (book: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, book.userId!))
    .limit(1);
  if (!user) {
    return null;
  }

  const borrowingEligibility = {
    isEligible: book.availableCopies > 0 && user.status === "APPROVED",
    message:
      book.availableCopies <= 0
        ? "Book is not available"
        : "User is not approved",
  };

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{book.title}</h1>
        <div className="book-info">
          <p>
            By{" "}
            <span className="font-semibold text-light-200">{book.author}</span>
          </p>
          <p>
            Category By{" "}
            <span className="font-semibold text-light-200">{book.genre}</span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{book.rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p>
            Total Books: <span>{book.totalCopies}</span>
          </p>

          <p>
            Available Books: <span>{book.availableCopies}</span>
          </p>
        </div>

        <p className="book-description">{book.description}</p>

        <BorrowBook
          bookId={book.id}
          userId={book.userId!}
          borrowingEligibility={borrowingEligibility}
        />
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={book.coverColor}
            coverUrl={book.coverUrl}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={book.coverColor}
              coverUrl={book.coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
