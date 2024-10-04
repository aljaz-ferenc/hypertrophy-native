import {BASE_URL} from "@/constants/api";
import {useMutation, useQuery} from "react-query";
import {User} from "@/types";

const fetchUpdateUser = async (userId: string, update: object): Promise<User> => {
    try{
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    return data
    }catch(err){
        console.log(err)
    }
}

export default function useUpdateUser() {
    return useMutation({
        mutationKey: ['updateUser'],
        mutationFn: ({userId, update}: { userId: string; update: object }) => fetchUpdateUser(userId, update)
    });
}