import { BASE_URL } from "@/constants/api";
import { Mesocycle } from "@/types";
import { useMutation } from "react-query";

const fetchActivateMeso = async (meso: Mesocycle, mesoId: string) => {
    const res = await fetch(`${BASE_URL}/activateMeso`, {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ meso, mesoId }),
        method: 'POST'
    })
    const data = await res.json()
    return data
}

const useActivateMesocycle = () => {
    return useMutation({
        mutationKey: ['activateMeso'],
        mutationFn: ({meso, mesoId}:{meso: Mesocycle, mesoId: string}) => fetchActivateMeso(meso, mesoId)
    })
}

export default useActivateMesocycle