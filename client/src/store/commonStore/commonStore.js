import { create } from "zustand";

export const commonStore = create((set, get) => ({
    value: false,
    setValue: (value) => {
        set({ value })
    }
}))