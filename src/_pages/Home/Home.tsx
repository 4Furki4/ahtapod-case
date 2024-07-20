import React from 'react'
import CreatePost from './CreatePost'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getPosts } from '@/lib/api'
import Posts from './Posts'

export default async function Home({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {

  const queryClient = new QueryClient()
  const page = searchParams?.page ? parseInt(searchParams.page as string) : 1
  await queryClient.prefetchQuery({
    queryKey: ['posts', page],
    queryFn: () => getPosts(page),
  })
  return (
    <>
      <CreatePost pageNumber={page} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts pageNumber={page} />
      </HydrationBoundary>
    </>
  )
}
