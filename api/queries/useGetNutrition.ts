import { BASE_URL } from "@/constants/api"
import { Macros, Nutrition } from "@/types"
import { useQuery } from "react-query"

type ResponseData = {
    nutrition: Array<Nutrition>,
    totalToday: Macros
    totalWeek: Macros
    weightData: {date: Date, caloriesTotal: number}[]
}

const fetchNutrition = async (userId: string): Promise<ResponseData> => {
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