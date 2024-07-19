'use client'
import { getPosts } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function Posts() {
    const { data } = useQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts(),
        staleTime: 1000 * 60 * 5,
    })

    return (
        <div className='max-w-6xl mx-auto flex flex-col gap-4 p-4'>
            {data?.map((post: any) => (
                <div key={post.id} className='p-4 rounded-md border-2'>
                    <h2 className='text-xl font-bold'>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    )
}
