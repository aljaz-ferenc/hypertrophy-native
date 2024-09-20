import {Mesocycle} from "@/types";

export function todaysWorkout(mesocycle: Mesocycle | null) {
    if(!mesocycle) return null
    //get workout that matches today's day
    const today = getTodaysDay();
    return mesocycle.workouts.find((workout) => workout.weekDay === today);

}

export function getTodaysDay() {
    //get days (monday = 1 ... sunday = 7)
    return [7, 1, 2, 3, 4, 5, 6][new Date().getDay()];
}