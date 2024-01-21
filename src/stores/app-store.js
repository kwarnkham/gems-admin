import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: null,
    appSetting: null
  }),

  getters: {
    getUser (state) {
      return state.user
    },
    getAppSetting (state) {
      return state.appSetting
    }
  },

  actions: {
    setUser (payload) {
      this.user = payload
    },
    setAppSetting (payload) {
      this.appSetting = payload
    },
  }
})
