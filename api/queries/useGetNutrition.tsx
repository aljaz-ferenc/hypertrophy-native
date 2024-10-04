import {BASE_URL} from "@/constants/api";
import {useQuery} from "react-query";
import {Nutrition} from "@/types";

const fetchNutrition = async (userId: string): Promise<{nutrition: Nutrition[] }> => {
    const res = await fetch(`${BASE_URL}/nutrition/${userId}`)
    const nutrition = await res.json()
    return nutrition
}

export default (userId: string) => {
    return useQuery({
        queryKey: ['nutrition', {userId}],
        queryFn: () => fetchNutrition(userId)
    })
}