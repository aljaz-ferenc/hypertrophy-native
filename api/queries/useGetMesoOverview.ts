import {useQuery} from "react-query";
import useUserStore from '@/store/user.store'
import Endpoints from "@/api/endpoints";
import {useShallow} from "zustand/react/shallow";
import useGetActiveMesocycle from "@/api/queries/useGetActiveMesocycle";

export type OverviewResponse = {
    mesoDates: {
        date: Date,
        workoutCompleted: 'completed' | 'missed' | 'rest' | 'upcoming'
    }[],
    mesocycle: string
}

const fetchMesoOverview = async (userId: string, mesoId: string) => {
    const res = await fetch(`${Endpoints.mesocycles}/${userId}/${mesoId}/overview`)
    return await res.json()
}

const useGetMesoOverview = () => {
    const [userId] = useUserStore(useShallow(state => [state.user?._id]))
    const {data} = useGetActiveMesocycle(userId!)

    return useQuery<OverviewResponse>({
        queryKey: ['get-mesoOverview'],
        queryFn: () => fetchMesoOverview(userId!, data?.mesocycle?._id!),
        enabled: !!data?.mesocycle?._id
    })
}

export default useGetMesoOverview