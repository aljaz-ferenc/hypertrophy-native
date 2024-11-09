import {useQuery} from "react-query";
import {Mesocycle} from "@/types";
import { BASE_URL } from "@/constants/api";

const fetchMesocycles = async (userId: string): Promise<Mesocycle[]> => {
    const res = await fetch(`${BASE_URL}/mesocycles/${userId}`)
    return await res.json()
}

export default (userId: string) => {
    return useQuery({
        queryKey: ['mesocycle', {user: userId}],
        queryFn: () => fetchMesocycles(userId)
    })
}
