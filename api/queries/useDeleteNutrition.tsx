import { BASE_URL } from "@/constants/api"
import {  useQueryClient, useMutation } from "react-query"

const fetchDeleteNutrition = async (itemId: string) => {
    const res = await fetch(`${BASE_URL}/nutrition/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(itemId)
    })
    const data = await res.json()
    return data
}

const useDeleteNutrition = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['delete-nutrition'],
        mutationFn: (itemId: string) => fetchDeleteNutrition(itemId),
        onSuccess: () => {
            console.log('success')
            queryClient.invalidateQueries(['nutrition'])
        }
    })
}

export default useDeleteNutrition