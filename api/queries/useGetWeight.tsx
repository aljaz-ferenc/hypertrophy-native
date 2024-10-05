import { BASE_URL } from "@/constants/api"
import { UnitSystems } from "@/enums/UnitSystems"
import { Range } from "@/types"
import { useQuery } from "react-query"

type Response = {
    weight: {
        value: number,
        date: Date,
        units: UnitSystems
    }[]
}

const fetchWeight = async (userId: string, range: Range): Promise<Response> => {
    const res = await fetch(`${BASE_URL}/users/${userId}?field=weight&range=${range}`)
    const data = await res.json()
    return data
}

const useGetWeight = (userId: string, range: Range) => {
    return useQuery({
        queryKey: ['weight', {userId, range}],
        queryFn: () => fetchWeight(userId, range)
    })
}

export default useGetWeight