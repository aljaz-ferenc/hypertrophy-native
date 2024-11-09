import {BASE_URL} from "@/constants/api";

export default class Endpoints{
    public static login = `${BASE_URL}/login`
    public static register = `${BASE_URL}/register`
    public static muscleGroups = `${BASE_URL}/muscleGroups`
    public static exercises = `${BASE_URL}/exercises`
    public static mesocycles = `${BASE_URL}/mesocycles`
}