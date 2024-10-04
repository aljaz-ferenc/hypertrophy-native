import { BASE_URL } from "@/constants/api"
import { WorkoutLog } from "@/types"
import { useMutation } from "react-query"

const fetchAddWorkout = async (userId: string, logId: string, workout: WorkoutLog, weekIndex: number, workoutIndex: number) => {
    const res = await fetch(`${BASE_URL}/logs/${userId}/${logId}`, {
        method: 'POST',
        headers: {
            'Content-Type':"application/json"
        },
        body: JSON.stringify({
            workout, weekIndex, workoutIndex
        })
    })
    const data = await res.json()
    console.log(data)
    return data
}

const useCompleteWorkout = () => {
    return useMutation(({ userId, logId, workout, weekIndex, workoutIndex }: 
    { userId: string, logId: string, workout: WorkoutLog, weekIndex: number, workoutIndex: number }) => 
        fetchAddWorkout(userId, logId, workout, weekIndex, workoutIndex)
    );
};

export default useCompleteWorkout