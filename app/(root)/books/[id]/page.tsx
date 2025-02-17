import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { IKVideo } from "imagekitio-next";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();

  const bookDetails = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);
  if (bookDetails.length < 1) redirect("/404");

  return (
    <>
      <BookOverview {...bookDetails[0]} userId={session?.user?.id as string} />
      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails[0].videoUrl} />
            {/* <IKVideo
              path={bookDetails[0].videoUrl}
              style={{
                width: "100%",
                height: "100%",
              }}
            /> */}
            <section className="mt-10 flex flex-col gap-7">
              <h3>Summary</h3>
              <div className="space-y-5 text-xl text-light-100">
                {bookDetails[0].summary.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
};

export default page;
