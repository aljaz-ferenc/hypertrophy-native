import { BASE_URL } from "@/constants/api";
import { Nutrition } from "@/types";
import { useMutation, useQueryClient } from "react-query";

const createNutrition = async (nutrition: Omit<Nutrition & {itemId: string}, 'item'>) => {
  console.log("NUTRITION: ", nutrition)
  const res = await fetch(`${BASE_URL}/nutrition`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nutrition),
  });
  const newNutrition = await res.json();
  return newNutrition;
};

export default function useCreateNutrition(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createNutrition", { userId }],
    mutationFn: (nutrition: Omit<Nutrition & {itemId: string}, 'item'>) => createNutrition(nutrition),
    onSuccess:() => queryClient.invalidateQueries('nutrition')
    // onSuccess: queryClient.invalidateQueries('nutrition')
    // onMutate: async (newNutrition) => {
    //   await queryClient.cancelQueries({ queryKey: ["nutrition"] });

    //   // Snapshot the previous value
    //   const previousNutrition = queryClient.getQueryData(["nutrition"]);

    //   // Optimistically update to the new value
    //   queryClient.setQueryData(["nutrition"], (old: any) => ({
    //     ...old,
    //     nutrition: [...old.nutrition, newNutrition],
    //   }));

    //   // Return a context object with the snapshotted value
    //   return { previousNutrition };
    // },
    // // If the mutation fails,
    // // use the context returned from onMutate to roll back
    // onError: (err, newNutriton, context) => {
    //   queryClient.setQueryData(["nutrition"], context!.previousNutrition);
    // },
    // // Always refetch after error or success:
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["nutrition"] });
    // },
  });
}
