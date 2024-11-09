import {Mesocycle, WeightUnits, Workout} from "@/types";
import {create} from "zustand";
import * as Crypto from 'expo-crypto'

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
    setExercise: (workoutId: string, exerciseId: string, exerciseName: string) => void
}

export const useNewMesoStore = create<NewMesoStore>((set) => ({
    duration: 0,
    title: '',
    workouts: [],
    units: 'kg',
    setDuration: (duration) => set({duration}),
    setUnits: (units) => set({units}),
    setTitle: (title) => set({title}),
    addWorkout: () => set((state) => ({
        workouts: [...state.workouts, {exercises: [], id: Crypto.randomUUID(), weekDay: 0}],
    })),
    updateWorkout: (workoutId, field, value) => set((state) => {
        const updatedWorkouts = state.workouts.map((w) => {
            if (w.id === workoutId) {
                // @ts-ignore
                w[field] = value;
                return {...w};
            }
            return w;
        });
        return {workouts: updatedWorkouts};
    }),
    setExercise: (workoutId, exerciseId, exerciseName) => set((state) => {
        const updatedWorkouts = state.workouts.map((w) => {
            if (w.id === workoutId) {
                console.log('AAAAA: ', w)
                const updatedExercises = w.exercises.map((e) => {
                    if (e._id === exerciseId) {
                        return {...e, name: exerciseName}; // Ensure it updates `name`
                    }
                    return e;
                });
                return {...w, exercises: updatedExercises};
            }
            return w;
        });
        return {workouts: updatedWorkouts};
    }),

}));


