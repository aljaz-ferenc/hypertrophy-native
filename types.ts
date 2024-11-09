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
    isActive?: boolean,
    title: string,
    user?: string,
    workouts: Workout[]
    _id?: string
    startDate?: Date
    units: WeightUnits
}

export type Workout = {
    exercises: Exercise[],
    id: string,
    weekDay: number
}

export type Exercise = {
    name: string,
    _id: string,
    muscleGroup: MuscleGroup
}

export type WorkoutLog = {
    day: number
    exercises: {
        exercise: string
        data: {
            reps:  number
            weight:  number
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
            data: { reps: number, weight: number }[],
            exercise: string,
            id: string
        }[]
    }[]
}[]

export type Range = 'all' | 'week' | 'month' | 'year'

export type Nutrition = {
    _id?: string,
    user: string,
    date: Date,
    amount: number,
    item: FoodItem
}

export type Portion = {
    title: string,
    amount: string,
    id: string
    item: string
}

export type FoodItem = {
    _id?: string
    name: string,
    calories: number,
    protein: number,
    fat: number,
    carbs: number,
    user: string,
    portions: Portion[]
}

export type Macros = {calories: number, protein: number, fat: number, carbs: number}

//
// export type MuscleGroup =
//     | "biceps"
//     | "triceps"
//     | "chest"
//     | "back"
//     | "shoulders"
//     | "quads"
//     | "glutes"
//     | "hamstrings"
//     | "abs"
//     | "traps"
//     | "forearms"
//     | "calves"
//     | "neck"

export type Weekday =
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";

export type HeightUnits = 'cm' | 'in'
export type WeightUnits = 'kg' | 'lb'
export type Units = HeightUnits | WeightUnits

export type Measurement<T> = {
    value: number,
    date: Date,
    units: T
}

export type MuscleGroup = {
    name: string,
    _id: string
}