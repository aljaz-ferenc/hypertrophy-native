import { create } from "zustand";
import {Mesocycle, Nutrition} from "@/types";

type NutritionStore = {
    nutrition: Nutrition[]
};

export default create<NutritionStore>((set) => ({
    nutrition: []
}));
