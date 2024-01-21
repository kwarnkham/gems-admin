import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: null,
    appSetting: null
  }),

  getters: {
    getUser ({ user }) {
      return user
    },
    getAppSetting ({ appSetting }) {
      return appSetting
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
