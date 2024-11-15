import {Mesocycle} from "@/types";
import {useMutation, useQueryClient} from "react-query";
import {BASE_URL} from "@/constants/api";
import Endpoints from "@/api/endpoints";

const fetchActivateMeso = async (userId: string, meso: Mesocycle) => {
    const res = await fetch(Endpoints.activateMeso(userId, meso._id as string), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(meso)
    })
    const data = await res.json()
    console.log(data)
    return data
}

export default function useActivateMesocycle() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['activate-mesocycle'],
        mutationFn: ({userId, meso}: { userId: string, meso: Mesocycle }) => fetchActivateMeso(userId, meso),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['mesocycle']})
            queryClient.invalidateQueries({queryKey: ['active-mesocycle']})
        }
    })
}