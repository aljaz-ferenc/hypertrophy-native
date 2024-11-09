import { BASE_URL } from "@/constants/api"
import { Mesocycle } from "@/types"
import { useQuery } from "react-query"

type Response = {
    message: string,
    mesocycle: Mesocycle | null
}

const fetchActiveMesocycle = async (userId: string): Promise<Response> => {
    const res = await fetch(`${BASE_URL}/mesocycles/${userId}/active`)
    const data = await res.json()
    return data
}

const useGetActiveMesocycle = (userId: string) => {
    return useQuery({
        queryKey:['active-mesocycle', {userId}],
        queryFn: () => fetchActiveMesocycle(userId)
    })
}

export default useGetActiveMesocycle