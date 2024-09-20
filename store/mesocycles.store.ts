import {create} from "zustand";
import {Mesocycle} from "@/types";


type MesoStore = {
    mesocycles: Mesocycle[],
    active: Mesocycle
    setMesocycles: (mesocycles: Mesocycle[]) => void
}

export default create<MesoStore>((set) => ({
    mesocycles: [],
    active: {} as Mesocycle,
    setMesocycles: (mesocycles: Mesocycle[]) => {
        const activeMeso = mesocycles.find(m => m.isActive) || null
        console.log("STORE ACTIVE: ", activeMeso)
        set(state => {
            return {...state, mesocycles, active: activeMeso}
        })
    }
}))