import React from 'react'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar } from '@/components/ui/avatar'

export default function SkeletonCards() {
    return (
        <div className='max-w-6xl mx-auto flex flex-col gap-4'>
            {Array.from({ length: 10 }).map((_, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className='w-1/2 h-8' />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className='w-full h-24' />
                    </CardContent>
                    <CardFooter>
                        <div className='flex items-center ml-auto gap-2'>
                            <Avatar className='ml-auto'>
                                <Skeleton className='w-10 h-10' />
                            </Avatar>
                            <Skeleton className='w-20 h-4' />
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
