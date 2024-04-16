'use client'

import { Hai } from "@/lib/types";
import { create } from "zustand";

interface SelectHaiState {
  hai: Hai | '?'
  select: (by: Hai | '?') => void
}
export const useHaiSelectStore = create<SelectHaiState>()((set) => ({
  hai: '?',
  select: (by) => set(() => ({hai: by}))
}))