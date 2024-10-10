export type User = {
    _id: string,
    clerkId: string,
    email: string,
    firstName: string,
    lastName: string,
    image: string,
    lastWorkout?: Date,
    stats?: Stats
    units?: 'metric' | 'imperial'
}

export type Stats = {
    height: number,
    weight: [{ value: number, date: Date }],
    dob: Date,
    bmr: number
    bodyParts: BodyPart
}

export type BodyPart = {
    date: Date,
    value: number
}[]

export type Mesocycle = {
    duration: number,
    isActive: boolean,
    title: string,
    user: string,
    workouts: Workout[]
    _id: string
    startDate: Date
}

export type Workout = {
    exercises: Exercise[],
    id: string,
    weekDay: number
}

export type Exercise = {
    exercise: string,
    id: string,
    muscleGroup: string
}

export type WorkoutLog = {
    day: number
    exercises: {
        exercise: string
        data: {
            reps: number
            weight: number
        }[]
    }[]
}

export type ExerciseLog = {
    exercise: string,
    data: {
        reps: number,
        weight: number
    }[]
}[]


export type Log = {
    duration: number,
    mesoId: string,
    mesoTitle: string,
    user: string,
    weeks: LogWeek
}

type LogWeek = {
    workouts: {
        day: number,
        exercises: {
           data: {reps: number, weight: number}[],
           exercise: string,
           id: string
        }[]
    }[]
}[]

export type Range = 'all' | 'week' | 'month' | 'year'
 
export type Nutrition = {
    _id: string,
    user: string,
    date: Date,
    amount: number,
    itemId: string,
    item: string,
}

export type Portion = {
    title: string,
    amount: string,
    id: string
}

export type FoodItem = {
    name: string,
    calories: number,
    protein: number,
    fat: number,
    carbs: number,
    user: string,
    portions: Portion[]
}