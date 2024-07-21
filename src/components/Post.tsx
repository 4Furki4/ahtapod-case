import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from '@/components/ui/avatar'

export default function Post({
    post,
    editModalTrigger,
    deleteModalTrigger
}: {
    post: PostWithUser,
    editModalTrigger?: React.ReactNode
    deleteModalTrigger?: React.ReactNode
}) {
    return (
        <Card key={post.id}>
            <CardHeader>
                <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent className=''>
                <pre className='text-wrap'>{post.content}</pre>
            </CardContent>
            <CardFooter>
                <div className='flex gap-2'>
                    {editModalTrigger}
                    {deleteModalTrigger}
                </div>
                <div className='flex items-center ml-auto gap-2'>
                    <Avatar className='ml-auto'>
                        <AvatarImage src={post.user?.imageUrl ?? ''} alt={post.user?.firstName ?? ''} />
                    </Avatar>
                    <p>{post.user?.firstName}</p>
                </div>

            </CardFooter>
        </Card>
    )
}
