import { BASE_URL } from "@/constants/api"
import { Nutrition } from "@/types"
import { useQuery } from "react-query"

const fetchNutrition = async (userId: string): Promise<{nutrition: Nutrition[]}> => {
    const res = await fetch(`${BASE_URL}/nutrition/user/${userId}`)
    const data = await res.json()
    return data
}

const useGetNutrition = (userId: string) => {
    return useQuery({
        queryKey: ['nutrition'],
        queryFn: () => fetchNutrition(userId),
    })
}

export default useGetNutrition