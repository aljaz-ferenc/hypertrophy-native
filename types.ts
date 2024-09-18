export type User = {
    _id: string,
    clerkId: string,
    email: string,
    firstName: string,
    lastName: string,
    image: string,
    lastWorkout: Date,
    stats: Stats
    units: 'metric' | 'imperial'
}

type Stats = {
    height: number,
    weight: [{value: number, date: Date}],
    dob: Date,
    bmr: number
    bodyParts: BodyPart
}

type BodyPart = {
    date: Date,
    value: number
}[]