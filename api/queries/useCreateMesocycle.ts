import { BASE_URL } from "@/constants/api";
import { Mesocycle } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import Endpoints from "../endpoints";
import useUserStore from '@/store/user.store'
import { useRouter } from "expo-router";

const fetchPostMeso = async (meso: Mesocycle, userId: string) => {
console.log(meso)
    const res = await fetch(`${Endpoints.mesocycles}/${userId}`, {
        method: 'POST',
        body: JSON.stringify(meso),
        headers: {
            'Content-Type':'application/json'
        }
    })
    const data = await res.json()
    console.log(data)
    return data
}

export default function useCreateMesocycle(){
    const queryClient = useQueryClient()
    const userId = useUserStore(state => state.user?._id)
    const {navigate} = useRouter()

    return useMutation({
        mutationKey: ['create-mesocycle'],
        mutationFn: (meso: Mesocycle) => fetchPostMeso(meso, userId!),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['mesocycle', {user: userId}]})
            navigate('/my-mesocycles')
        }
    })
}