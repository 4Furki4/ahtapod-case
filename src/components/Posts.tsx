'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { ReactNode, useCallback } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SkeletonCards from './SkeletonCards'
import Post from './Post'
import DeleteModal from '@/_pages/Dashboard/DeleteModal'
import EditModal from '@/_pages/Dashboard/EditModal'
import { getPosts } from '@/lib/api/post'
export default function Posts({ pageNumber, showDelete, showEdit }: { pageNumber: number, showDelete?: boolean, showEdit?: boolean }) {
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
    if (isError) {
        return (
            <div className='text-center'>
                <p className='text-destructive'>{error.message ?? 'Unexpected error'}</p>
            </div>
        )
    }
    if (isFetching || isPlaceholderData || isPending) {
        return (
            <SkeletonCards />
        )
    }
    console.log('posts', data.posts)
    return (
        <div className='max-w-6xl mx-auto flex flex-col gap-4'>
            {data?.posts.map((post) => (
                <Post key={post.id} post={post} editModalTrigger={showEdit && <EditModal pageNumber={page} post={post} />} deleteModalTrigger={showDelete && <DeleteModal page={page} postId={post.id} />} />
            ))}
            <Pagination lastPage={data.totalPages} currentPage={page}>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={
                            () => {
                                setPage((prev) => Math.max(prev - 1, 0))
                                router.push(pathname + '?' + createQueryString('page', (page - 1).toString()))
                            }
                        } />
                    </PaginationItem>
                    {
                        Array.from({ length: data.totalPages }, (_, i) => i + 1).map((item) => (
                            <PaginationItem key={item}>
                                <PaginationLink
                                    onClick={() => {
                                        setPage(item)
                                        router.push(pathname + '?' + createQueryString('page', item.toString()))
                                    }}
                                    isActive={item === page}
                                >
                                    {item}
                                </PaginationLink>
                            </PaginationItem>
                        ))
                    }
                    <PaginationItem >
                        <PaginationNext onClick={() => {
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
