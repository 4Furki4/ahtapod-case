import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'
import Posts from '../../components/Posts'
import { getPosts } from '@/lib/api/post'

export default async function Dashboard({
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
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Posts pageNumber={page} showDelete={true} showEdit={true} />
        </HydrationBoundary>
    )
}
