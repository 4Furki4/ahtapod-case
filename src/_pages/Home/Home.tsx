import React from 'react'
import CreatePost from './CreatePost'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getPosts } from '@/lib/api'
import Posts from './Posts'

export default async function Home() {

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts()
  })
  return (
    <>
      <CreatePost />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts />
      </HydrationBoundary>
    </>
  )
}
