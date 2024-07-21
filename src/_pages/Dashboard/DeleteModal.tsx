'use client'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { useAuth } from '@clerk/nextjs';
export default function DeleteModal({
    postId,
    page
}: {
    postId: string,
    page: number
}) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()
    const deletePostMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken()
            return deletePost(postId, token)
        },
        onSuccess: (deletedPost) => {
            toast.success('Post deleted successfully')
            console.log('deletedPost', deletedPost)
            queryClient.setQueryData(['posts', page], (old: any) => {
                console.log('old', old)
                return {
                    ...old,
                    posts: old.posts.filter((post: any) => post.id !== postId)
                }
            })
        },
        onError: (error: AxiosError) => {
            console.log(error)
        }
    })
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={'destructive'}>Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Post</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Are you sure you want to delete this post?
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            deletePostMutation.mutate()
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
