import Home from "@/_pages/Home/Home";

export default function HomePage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined }; }) {
  return (
    <main className='p-4 space-y-4'>
      <Home searchParams={searchParams} />
    </main>
  );
}
