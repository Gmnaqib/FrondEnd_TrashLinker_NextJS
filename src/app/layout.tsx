import type { Metadata } from "next";
import { NavBar } from '@/components/NavBar';
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "TrashLinker",
  description: "Generate awesome headshots in minutes using AI",
};

export default function RootLayout({ children, }: any) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <section>
          <Suspense
            fallback={
              <div className="flex w-full px-4 lg:px-40 py-4 items-center border-b text-center gap-8 justify-between h-[69px]" />
            }
          >
            <NavBar />
          </Suspense>
        </section>
        <main className="flex flex-1 flex-col items-center">
          {children}
        </main>
       
      </body>
    </html>
  );
}
