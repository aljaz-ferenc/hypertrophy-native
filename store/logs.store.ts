import {create} from "zustand";
import {Log, User} from "@/types";

type LogsStore = {
    logs: Log[] | null,
    setLogs: (logs: Log[]) => void
}

export default create<LogsStore>((set) => ({
    logs: null,
    setLogs: (logs: Log[]) => set({logs})
}))