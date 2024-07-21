"use client"
import { getPostCount } from '@/lib/api/post'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function PostCount() {
    const { data } = useQuery({
        queryKey: ['postCount'],
        queryFn: getPostCount,
        staleTime: 1000 * 60 * 5,
    })
    return (
        <div className='sm:ml-auto bg-background p-4 rounded-lg shadow-md'>
            <p className='text-lg'>Total posts: {data?.count}</p>
        </div>
    )
}
