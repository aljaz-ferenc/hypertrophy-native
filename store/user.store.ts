import {create} from "zustand";
import {User} from "@/types";

enum UnitSystem {
    IMPERIAL = 'imperial',
    METRIC = 'metric'
}


type UserStore = {
    user: User | null,
    setUser: (user: User) => void
}

export default create<UserStore>((set) => ({
    user: null,
    setUser: (user: any) => set({user})
}))