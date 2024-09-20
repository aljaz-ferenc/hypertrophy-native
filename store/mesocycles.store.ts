import { create } from "zustand";
import { Mesocycle } from "@/types";

type MesoStore = {
  mesocycles: Mesocycle[];
  active: Mesocycle | null;
  setMesocycles: (mesocycles: Mesocycle[]) => void;
};

export default create<MesoStore>((set) => ({
  mesocycles: [],
  active: null,
  setMesocycles: (mesocycles: Mesocycle[]) => {
    const activeMeso = mesocycles.find((m) => m.isActive) || null;
    set((state) => {
      return { ...state, mesocycles, active: activeMeso };
    });
  },
}));
