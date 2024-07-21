import { getPosts } from '@/lib/api'
import { QueryClient } from '@tanstack/react-query'
import React from 'react'
import Posts from '../../components/Posts'
import DeleteModal from './DeleteModal'

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
        <Posts pageNumber={page} showDelete={true} showEdit={true} />
    )
}
