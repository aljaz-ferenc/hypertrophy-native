import {useQuery} from "react-query";
import {Log} from "@/types";

const BASE_URL = 'http://localhost:3000/api'

const fetchLogs = async (userId: string): Promise<Log[]> => {
    const res = await fetch(`${BASE_URL}/logs/${userId}`)
    const logs = await res.json()
    console.log(logs)
    return logs
}

const useGetLogs = (userId: string) => {
    return useQuery({
        queryKey: ['logs', {userId}],
        queryFn: () => fetchLogs(userId)
    })
}

export default useGetLogs