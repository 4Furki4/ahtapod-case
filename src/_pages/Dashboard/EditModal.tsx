import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
export default function EditModal({
    post
}: {
    post: PostWithUser
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-orange-400 hover:bg-orange-300'>Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Post</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <form>
                        <label htmlFor='title'>Title</label>
                        <input
                            type='text'
                            id='title'
                            name='title'
                            defaultValue={post.title}
                        />
                        <label htmlFor='content'>Content</label>
                        <textarea
                            id='content'
                            name='content'
                            defaultValue={post.content}
                        />
                    </form>
                </DialogDescription>
                <DialogFooter>
                    <Button>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
