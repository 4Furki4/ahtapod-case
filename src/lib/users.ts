import prisma from '@/lib/prisma'
import { User } from '@prisma/client'


/**
 *
 * @brief This function is used to create a user in the database when a user signs up through the Clerk API
 * @param data is the user data to be created
 * @returns the user if created successfully or error if an error occurs
 */
export async function createUser(data: User) {
    try {
        const user = await prisma.user.create({ data })
        console.log('User created:', user)
        return { user }
    } catch (error) {
        return { error }
    }
}

export async function getUserById({
    id,
    clerkUserId
}: {
    id?: string
    clerkUserId?: string
}) {
    try {
        if (!id && !clerkUserId) {
            throw new Error('id or clerkUserId is required')
        }

        const query = id ? { id } : { clerkUserId }

        const user = await prisma.user.findUnique({ where: query })
        return { user }
    } catch (error) {
        return { error }
    }
}

export async function UpdateUser(id: string, data: Partial<User>) {
    try {
        const user = await prisma.user.update({
            where: { id },
            data
        })
        return { user }
    } catch (error) {
        return { error }
    }
}