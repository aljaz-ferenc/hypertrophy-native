import { Exercise, Mesocycle, WeightUnits, Workout } from "@/types";
import { create } from "zustand";
import * as Crypto from "expo-crypto";

type NewMesoStore = {
  duration: Mesocycle["duration"];
  title: Mesocycle["title"];
  workouts: Mesocycle["workouts"];
  units: Mesocycle["units"];
  setDuration: (duration: Mesocycle["duration"]) => void;
  setUnits: (units: WeightUnits) => void;
  setTitle: (title: string) => void;
  addWorkout: (workout: Workout) => void;
  updateWorkout: (workoutId: string, field: string, value: any) => void;
  setExercise: (
    workoutId: string,
    exerciseId: string,
    exerciseName: string
  ) => void;
  setExercises: (workoutId: string, exercises: Exercise[]) => void;
  deleteExercise: (workoutId: string, exerciseId: string) => void;
  deleteWorkout: (workoutId: string) => void;
};

export const useNewMesoStore = create<NewMesoStore>((set) => ({
  duration: 4,
  title: "",
  workouts: [],
  units: "kg",
  setDuration: (duration) => set({ duration }),
  setUnits: (units) => set({ units }),
  setTitle: (title) => set({ title }),
  addWorkout: () =>
    set((state) => ({
      workouts: [
        ...state.workouts,
        { exercises: [], id: Crypto.randomUUID(), weekDay: 0 },
      ],
    })),
  updateWorkout: (workoutId, field, value) =>
    set((state) => {
      const updatedWorkouts = state.workouts.map((w) => {
        if (w.id === workoutId) {
          // @ts-ignore
          w[field] = value;
          return { ...w };
        }
        return w;
      });
      return { workouts: updatedWorkouts };
    }),
  setExercise: (workoutId, exerciseId, exerciseName) =>
    set((state) => {
      const updatedWorkouts = state.workouts.map((w) => {
        if (w.id === workoutId) {
          const updatedExercises = w.exercises.map((e) => {
            if (e._id === exerciseId) {
              const newExercise = { ...e, name: exerciseName };
              return newExercise;
            }
            return e;
          });
          return { ...w, exercises: updatedExercises };
        }
        return w;
      });
      return { workouts: updatedWorkouts };
    }),
  setExercises: (workoutId, exercises) => set(state => {
    const updatedWorkouts = state.workouts.map(w => {
      if(w.id === workoutId){
        return {...w, exercises: exercises}
      }
      return w
    })
    return {...state, workouts: updatedWorkouts}
  }),
  deleteExercise: (workoutId, exerciseId) =>
    set((state) => {
      const updatedWorkouts = state.workouts.map((w) => {
        if (w.id === workoutId) {
          return {
            ...w,
            exercises: w.exercises.filter((e) => e._id !== exerciseId),
          };
        }
        return w;
      });
      return { ...state, workouts: updatedWorkouts };
    }),
  deleteWorkout: (workoutId) =>
    set((state) => {
      return {
        ...state,
        workouts: state.workouts.filter((w) => w.id !== workoutId),
      };
    }),
}));
