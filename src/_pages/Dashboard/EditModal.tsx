"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { editPost } from '@/lib/api'
import { z } from 'zod'
import { AddPostSchema } from '@/schemas/AddPostSchema'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'

export default function EditModal({
    post,
    pageNumber
}: {
    post: PostWithUser,
    pageNumber: number
}) {
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const { getToken } = useAuth()
    const queryClient = useQueryClient()
    const form = useForm<z.infer<typeof AddPostSchema>>({
        defaultValues: {
            title: post.title,
            content: post.content
        },
        resolver: zodResolver(AddPostSchema)
    })
    const editMutation = useMutation({
        mutationFn: async (editedPost) => {
            const token = await getToken()
            return editPost(post.id, editedPost, token)
        },
        onSuccess: (editedPost) => {
            setIsModalOpen(false)
            form.reset()
            toast.success('Post edited successfully')
            queryClient.setQueryData(['posts', pageNumber], (old: any) => {
                return {
                    ...old,
                    posts: old.posts.map((oldPost: PostWithUser) => {
                        if (oldPost.id === post.id) {
                            return editedPost
                        }
                        return oldPost
                    })
                }
            })
        },
        onError: (error: AxiosError) => {
            toast.error(error.message ?? 'Failed to edit post')
        }
    })
    const onSubmit = (data: any) => {
        editMutation.mutate(data)
    }
    return (
        <Dialog
            open={isModalOpen}
            onOpenChange={(isOpen) => setIsModalOpen(isOpen)}
        >
            <DialogTrigger asChild>
                <Button onClick={() => setIsModalOpen((prev) => !prev)} className='bg-orange-400 hover:bg-orange-300'>Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Post</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-6xl flex flex-col mx-auto gap-2'>
                            <FormField name='title' control={form.control}
                                render={({ field }) =>
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} placeholder='Title' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }>
                            </FormField>
                            <FormField name='content' control={form.control}
                                render={({ field }) =>
                                    <FormItem>
                                        <FormControl>
                                            <Textarea {...field} placeholder='Type your content here...' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }>
                            </FormField>
                            <Button className='w-full' variant={'secondary'} disabled={editMutation.isPending}>
                                {editMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </>
                                ) : 'Save Post'}
                            </Button>
                        </form>
                    </Form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
