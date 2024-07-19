import { z } from 'zod';


export const AddPostSchema = z.object({
    title: z.string({
        message: 'Title is required'
    }).trim().min(1, {
        message: 'Title is required'
    }).max(100, {
        message: 'Title must be less than 100 characters'
    }),
    content: z.string({
        message: 'Content is required'
    }).trim().min(1, {
        message: 'Content is required'
    }).max(5000, {
        message: 'Content must be less than 5000 characters'
    }),
});