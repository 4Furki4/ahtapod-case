import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'
import Posts from '../../components/Posts'
import { getPostCount, getPosts } from '@/lib/api/post'
import { getUserCount } from '@/lib/api/user'
import UserCount from './UserCount'
import PostCount from './PostCount'

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
    await queryClient.prefetchQuery({
        queryKey: ['userCount'],
        queryFn: getUserCount
    })
    await queryClient.prefetchQuery({
        queryKey: ['postCount'],
        queryFn: getPostCount
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className=' max-w-6xl mx-auto flex flex-col sm:flex-row pb-4'>
                <UserCount />
                <PostCount />
            </div>
            <Posts pageNumber={page} showDelete={true} showEdit={true} />
        </HydrationBoundary>
    )
}
