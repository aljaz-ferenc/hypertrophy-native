import {useMutation} from "react-query";
import {FoodItem} from "@/types";
import {BASE_URL} from "@/constants/api";

const addFoodItem = async (item: FoodItem): Promise<FoodItem> => {
    console.log("ITEM: ", item)
    const res = await fetch(`${BASE_URL}/foodItems`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    const data = await res.json()
    return data
}

export default function useCreateFoodItem() {
    return useMutation({
        mutationKey: ['createFoodItem'],
        mutationFn: (item: FoodItem) => addFoodItem(item),
        //TODO: invalidate fetching items
    })
}