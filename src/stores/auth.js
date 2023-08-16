import { APIHandler, HTTPMethods } from '../api'
import { defineStore } from 'pinia'
import helpers from '../utils/helpers'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    refresh: null
  }),

  getters: {
  },

  actions: {
    login: async function (credentials) {
      const response = await APIHandler('users/token', HTTPMethods.POST, credentials)
      
      if (response && response.access) {
        this.token = response.access
        this.refresh = response.refresh

        helpers.saveState('access', response.access)
        helpers.saveState('refresh', response.refresh)
        return true
      }

      return false
    },
    register: async function (data) {
      const response = await APIHandler('users/register', HTTPMethods.POST, data)
      return response
    },
    logout: async function () {
      const response = await APIHandler('users/token/blacklist', HTTPMethods.POST)
      if (response) {
        this.token = null
        this.refresh = null
        helpers.removeState('access')
        helpers.removeState('refresh')
        return true
      }
    }
  }
})
