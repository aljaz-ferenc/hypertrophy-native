import {create} from "zustand";
import {Mesocycle} from "@/types";
import {getTodaysDay} from "@/utils";

type Exercise = {
    exercise: string;
    id: string,
    data: {
        reps: number | '';
        weight: number | '';
        id: string
    }[];
};

type TodaysWorkoutStore = {
    day: number;
    exercises: Exercise[];
    setExercises: (exercises: { id: string; exercise: string }[]) => void;
    removeInput: (exerciseId: string, inputId: string) => void;
    addInput: (exerciseId: string) => void;
    updateInput: (
        exerciseId: string,
        inputId: string,
        value: number | '',
        field: "reps" | "weight"
    ) => void;
};

const useTodaysWorkoutStore = create<TodaysWorkoutStore>((set) => ({
    day: getTodaysDay(),
    exercises: [],
    setExercises: (exercises: { id: string; exercise: string }[]) =>
        set((state) => {
            const modded: Exercise[] = exercises.map((e) => ({
                exercise: e.exercise,
                id: e.id,
                data: [{reps: "", weight: "", id: crypto.randomUUID()}],
            }));
            return {...state, exercises: modded};
        }),
    addInput: (exerciseId: string) => {
        set((state) => ({
            ...state,
            exercises: state.exercises.map((e) => {
                if (e.id === exerciseId) {
                    e.data.push({reps: "", weight: "", id: crypto.randomUUID()});
                }
                return e;
            }),
        }));
    },
    removeInput: (exerciseId: string, inputId: string) => {
        set((state) => {
            return {
                ...state,
                exercises: state.exercises.map((e) => {
                    if (e.id === exerciseId) {
                        const filteredInputs = e.data.filter(
                            (input) => input.id !== inputId
                        );
                        return {...e, data: filteredInputs};
                    }
                    return e;
                }),
            };
        });
    },
    updateInput: (
        exerciseId: string,
        inputId: string,
        value: number | '',
        field: "reps" | "weight"
    ) => {
        set((state) => {
            return {
                ...state,
                exercises: state.exercises.map((e) => {
                    if (e.id === exerciseId) {
                        const updatedInputs = e.data.map((input) => {
                            if (input.id === inputId) {
                                if (field === "reps") {
                                    return {...input, reps: value};
                                }
                                if (field === "weight") {
                                    return {...input, weight: value};
                                }
                            }
                            return input;
                        });
                        return {...e, data: updatedInputs};
                    }
                    return e;
                }),
            };
        });
    },
}));

export default useTodaysWorkoutStore;
