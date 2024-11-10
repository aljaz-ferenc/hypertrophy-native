import {Macros, Mesocycle} from "@/types";
import { addWeeks, differenceInDays, startOfToday, subDays } from "date-fns";

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

export function getMesocycleProgress(startDate: Date, durationInWeeks: number){
    const today = startOfToday()

    if (today < startDate) return 0;

    const endDate = subDays(addWeeks(startDate, durationInWeeks), 1)
    const durationInDays = differenceInDays(endDate, startDate)
    const completed = differenceInDays(today, startDate)

    if (completed >= durationInDays) return 100;

    const progress = Math.min((completed / durationInDays) * 100, 100);
    return Math.round(Math.max(progress, 0));
}

export function calculateMacrosPercentages(macros: Macros) {
    const { calories, protein, fat, carbs } = macros;
  
    // Calculate the calories from each macronutrient
    const proteinCalories = protein * 4;
    const fatCalories = fat * 9;
    const carbsCalories = carbs * 4;
  
    // Calculate the total calories to avoid recalculating it
    const totalCalories = proteinCalories + fatCalories + carbsCalories;
  
    // Calculate the percentage for each macronutrient
    const proteinPercentage = (proteinCalories / totalCalories) * 100;
    const fatPercentage = (fatCalories / totalCalories) * 100;
    const carbsPercentage = (carbsCalories / totalCalories) * 100;
  
    // Return the percentages as an object
    return {
      protein: Math.round(proteinPercentage),
      fat: Math.round(fatPercentage),
      carbs: Math.round(carbsPercentage),
    };
  }
  