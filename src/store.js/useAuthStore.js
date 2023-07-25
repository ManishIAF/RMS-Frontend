import create from 'zustand'

export const useAuthStore = create((set) => ({
    auth:{
        username : '',
        profile:'',
        active : false
    },
    setUsername : (name,profile) => set((state) => ({auth : {...state.auth,username:name,profile:profile}}))
}))