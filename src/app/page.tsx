import Home from "@/_pages/Home/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home | Ahtapod',
  description: 'You can see added posts and add new post on this page',
}

export default function HomePage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined }; }) {
  return (
    <main className='p-4 space-y-4'>
      <Home searchParams={searchParams} />
    </main>
  );
}
