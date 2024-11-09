import {useQuery} from "react-query";
import Endpoints from "@/api/endpoints";
import {Exercise} from "@/types";

const fetchExercises = async() => {
    const res = await fetch(Endpoints.exercises)
    return await res.json()
}

const useGetExercises = () => {
    return useQuery<Exercise[]>({
        queryKey: ['exercises'],
        queryFn:fetchExercises
    })
}

export default useGetExercises