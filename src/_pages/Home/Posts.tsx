'use client'
import { getPosts } from '@/lib/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useCallback } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SkeletonCards from './SkeletonCards'
export default function Posts({ pageNumber }: { pageNumber: number }) {
    const [page, setPage] = React.useState(pageNumber)
    const limit = 10
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const { isPending, isError, error, data, isFetching, isPlaceholderData } = useQuery({
        queryKey: ['posts', page],
        queryFn: () => getPosts(page, limit),
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
    })
    if (isPending) {
        return <p>Loading...</p>
    }
    if (isError) {
        return <p>Error: {error.message}</p>
    }
    if (isFetching || isPlaceholderData) {
        return (
            <SkeletonCards />
        )
    }
    return (
        <div className='max-w-6xl mx-auto flex flex-col gap-4'>
            {data?.posts.map((post) => (
                <Card key={post.id}>
                    <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className=''>
                        <pre className='text-wrap'>{post.content}</pre>
                    </CardContent>
                    <CardFooter>
                        <div className='flex items-center ml-auto gap-2'>
                            <Avatar className='ml-auto'>
                                <AvatarImage src={post.user?.imageUrl ?? ''} alt={post.user?.firstName ?? ''} />
                            </Avatar>
                            <p>{post.user?.firstName}</p>
                        </div>
                    </CardFooter>
                </Card>
            ))}
            <Pagination lastPage={
                data.totalPages
            } currentPage={page}>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={
                            () => {
                                setPage((prev) => Math.max(prev - 1, 0))
                                router.push(pathname + '?' + createQueryString('page', (page - 1).toString()))
                            }
                        } />
                    </PaginationItem>
                    <PaginationItem >
                        <PaginationNext onClick={() => {
                            console.log('isPlaceholderData', isPlaceholderData)
                            if (!isPlaceholderData) {
                                setPage((old) => old + 1)
                                router.push(pathname + '?' + createQueryString('page', (page + 1).toString()),)
                            }
                        }} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
