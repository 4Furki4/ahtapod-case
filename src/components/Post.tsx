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
        <Card className='break-words hyphens-auto'>
            <CardHeader >
                <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent className=''>
                <pre className='text-wrap'>{post.content}</pre>
            </CardContent>
            <CardFooter className='flex flex-col items-start'>
                <div className='flex gap-2 mb-4'>
                    {editModalTrigger}
                    {deleteModalTrigger}
                </div>
                <div className='w-full flex flex-col sm:flex-row sm:items-center gap-2'>
                    <div className='flex flex-col'>
                        <span>
                            Post Created at: {new Date(post.createdAt).toLocaleString()}
                        </span>
                        {
                            post.updatedAt === post.createdAt ? null : (
                                <span>
                                    Post Updated at: {new Date(post.updatedAt).toLocaleString()}
                                </span>
                            )
                        }
                    </div>
                    <div className='sm:ml-auto flex items-center gap-2'>
                        <Avatar>
                            <AvatarImage src={post.user?.imageUrl ?? ''} alt={post.user?.username ?? ''} />
                        </Avatar>
                        <p>{post.user?.username}</p>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
