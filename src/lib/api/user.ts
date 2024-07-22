import { api } from "../utils";

/**
 *
 * @returns the total number of users
 */
export async function getUserCount() {
    return (await api.get('/api/users/count')).data as {
        count: number
    }
}