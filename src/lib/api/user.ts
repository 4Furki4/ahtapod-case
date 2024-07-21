import { api } from "../utils";

export async function getUserCount() {
    return (await api.get('/api/users/count')).data
}