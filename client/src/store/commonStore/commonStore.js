import { create } from "zustand";

export const commonStore = create((set, get) => ({
    value: false,
    showBot: false,
    setValue: (value) => {
        set({ value })
    },
    setShowBot: (showBot) => {
        set({ showBot })
    },
    showChat: false,
    setShowChat: (showChat) => {
        set({ showChat })
    }

}))