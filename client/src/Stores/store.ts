import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import { api } from "../Api/base";





export const useUserStore = create();

// import { create } from 'zustand'

// type State = {
//   count: number
// }

// type Actions = {
//   increment: (qty: number) => void
//   decrement: (qty: number) => void
// }

// const useCountStore = create<State & Actions>((set) => ({
//   count: 0,
//   increment: (qty: number) => set((state) => ({ count: state.count + qty })),
//   decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
// }))
