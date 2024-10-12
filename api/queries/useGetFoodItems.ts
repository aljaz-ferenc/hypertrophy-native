import { BASE_URL } from "@/constants/api";
import { FoodItem } from "@/types";
import { useQuery } from "react-query";

type Response = Array<FoodItem & {_id: string}>

const fetchFoodItems = async (userId: string) => {
    const res = await fetch(`${BASE_URL}/foodItems/user/${userId}`)
    const data = await res.json()
    return data
}

export default function useGetFoodItems(userId: string){
    return useQuery<Response>({
        queryKey: ['foodItems', {userId}],
        queryFn: () => fetchFoodItems(userId),
        enabled: false
    })
}