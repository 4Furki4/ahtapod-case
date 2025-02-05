'use client'
import React from 'react'
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddPostSchema } from '@/schemas/AddPostSchema';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';
import { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { createPost } from '@/lib/api/post';


export default function CreatePost({ pageNumber }: {
    pageNumber: number
}) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()
    const form = useForm<z.infer<typeof AddPostSchema>>({
        resolver: zodResolver(AddPostSchema),
        defaultValues: {
            title: '',
            content: ''
        }
    })
    const postMutation = useMutation({
        mutationFn: async (newPost: Post) => {
            const token = await getToken()
            return createPost(newPost, token)
        },
        onSuccess: async (newPost: Post) => {
            toast.success('Post created successfully')
            queryClient.setQueryData(['posts', pageNumber], (old: { posts: Post[], totalPages: number, totalPosts: number }) => {
                console.log('old', old)
                return {
                    ...old,
                    posts: [newPost, ...old.posts]
                }
            })
            form.reset()
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 401) {
                toast.error('Please sign in to create a post')
                return
            }
            toast.error('Failed to create post')
        },
    })
    const onSubmit = (data: any) => {
        postMutation.mutate(data)
    }
    return (
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
                <Button className='w-full' variant={'secondary'} disabled={postMutation.isPending}>
                    {postMutation.isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : 'Create Post'}
                </Button>
            </form>
        </Form>
    )
}
