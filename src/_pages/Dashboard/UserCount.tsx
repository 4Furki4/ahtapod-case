"use client"
import { getUserCount } from '@/lib/api/user'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function UserCount() {
    const { data } = useQuery({
        queryKey: ['userCount'],
        queryFn: getUserCount,
        staleTime: 1000 * 60 * 5,
    })
    return (
        <div className='bg-background p-4 rounded-lg shadow-md'>
            <p className='text-lg'>Total users: {data?.count}</p>
        </div>
    )
}
