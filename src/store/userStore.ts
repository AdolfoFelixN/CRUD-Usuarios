import {create} from 'zustand'

interface StoreState{
    user: string,
    setUserStore: (user: string) => void
}

const useStore = create<StoreState>((set) => ({
    user: "",
    setUserStore: (user:string) => set({user}),
}))

export default useStore;