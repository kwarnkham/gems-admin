import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: null
  }),

  getters: {
    getUser (state) {
      return state.user
    }
  },

  actions: {
    setUser (payload) {
      this.user = payload
    }
  }
})
