import {create} from "zustand";
import {Mesocycle} from "@/types";
import {getTodaysDay} from "@/utils";

type Exercise = {
    id: string,
    exercise: string
    data: {
        reps: number
        weight: number
    }[]
}

type TodaysWorkoutStore = {
    day: number
    exercises: Exercise[],
    setExercises: (exercises: { id: string, exercise: string }[]) => void
}

const useTodaysWorkoutStore = create<TodaysWorkoutStore>((set) => ({
    day: getTodaysDay(),
    exercises: [],
    setExercises: (exercises: { id: string, exercise: string }[]) => set((state) => {
        const modded: Exercise[] = exercises.map(e => ({exercise: e.exercise, id: e.id, data: [{reps: 0, weight: 0}]}))
        return {...state, exercises: modded}
    })
}));

export default useTodaysWorkoutStore