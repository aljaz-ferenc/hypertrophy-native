import { BASE_URL } from "@/constants/api";
import { Nutrition } from "@/types";
import { useMutation, useQueryClient } from "react-query";

const createNutrition = async (
  nutrition: Omit<Nutrition & { item: string }, "_id">
) => {
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
    mutationFn: (
      nutrition: Omit<Nutrition & { item: string }, "_id"> & { item: string }
    ) => createNutrition(nutrition),
    onMutate: async (newNutrition: Omit<Nutrition & {item: string}, '_id'>) => {
      await queryClient.cancelQueries({ queryKey: ["nutrition"] });

      // Snapshot the previous value
      const previousNutrition = queryClient.getQueryData(["nutrition"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["nutrition"], (old: any) => ({...old, nutrition: [...old.nutrition, newNutrition]}));

      // Return a context object with the snapshotted value
      return { previousNutrition };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newNutriton, context) => {
      queryClient.setQueryData(["nutrition"], context!.previousNutrition);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["nutrition"] });
    },
  });
}
