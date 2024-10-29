import {Mesocycle, WeightUnits, Workout} from "@/types";
import {create} from "zustand";

type NewMesoStore = {
    duration: Mesocycle['duration'],
    title: Mesocycle['title'],
    workouts: Mesocycle['workouts'],
    units: Mesocycle['units'],
    setDuration: (duration: Mesocycle['duration']) => void
    setUnits: (units: WeightUnits) => void
    setTitle: (title: string) => void
    addWorkout: (workout: Workout) => void
    updateWorkout: (workoutId: string, field: string, value: any) => void
}

export const useNewMesoStore = create<NewMesoStore>(set => ({
    duration: 0,
    title: '',
    workouts: [],
    units: 'kg',
    setDuration: (duration) => set({duration}),
    setUnits: (units) => set({units}),
    setTitle: (title) => set({title}),
    addWorkout: (workout) => set(state => ({workouts: [...state.workouts, workout]})),
    updateWorkout: ( workoutId, field, value) => set(state => {
        const updatedWorkouts = state.workouts.map(w => {
            if (w.id === workoutId) {
                return {...w, field: value};
            }
            return w;
        });

        return { workouts: updatedWorkouts };
    })
}))