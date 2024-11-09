import { BASE_URL } from "@/constants/api"
import { B } from "@expo/html-elements"
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
        // onSuccess: () => {
        //     console.log('success')
        //     queryClient.invalidateQueries(['nutrition'])
        // },
        onMutate: async (nutritionId: string) => {
            await queryClient.cancelQueries(['delete-nutrition'])
            const previousNutrition = queryClient.getQueryData('nutrition')
            queryClient.setQueryData(['nutrition'], (old: any) => ({...old, nutrition: [...old.nutrition.filter((n: any) => n._id !== nutritionId)]}))
            return {previousNutrition}
        },
        onError: (err, newNutrition, context) => {
            queryClient.setQueryData(['nutrition'], context!.previousNutrition)
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['nutrition']})
        }
    })
}

export default useDeleteNutrition