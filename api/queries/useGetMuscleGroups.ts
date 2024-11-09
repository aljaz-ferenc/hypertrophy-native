import {useQuery} from "react-query";
import Endpoints from "@/api/endpoints";
import {MuscleGroup} from "@/types";

const fetchMuscleGroups = async () => {
    const res = await fetch(Endpoints.muscleGroups)
    return await res.json()
}

export const useGetMuscleGroups = () => {
    return useQuery<MuscleGroup[]>({
        queryKey: ['muscle-groups'],
        queryFn: fetchMuscleGroups
    })
}