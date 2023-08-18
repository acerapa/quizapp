import { APIHandler, HTTPMethods, verfiyToken } from '../api'
import { defineStore } from 'pinia'
import { StateKeys, saveState, removeState, getState } from '../utils/helpers'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    refresh: null
  }),

  getters: {
  },

  actions: {
    getAuthUser: async function () {
      const isVerfied = await verfiyToken()
      if (!isVerfied) {
        console.log('need login')
        return
      }

      const response = await APIHandler('users/me', HTTPMethods.GET, null, {
        Authorization: `Bearer ${getState(StateKeys.ACCESS)}`
      })
      if (response) {
        this.user = response.user
        return true
      }
      return false
    },
    login: async function (credentials) {
      const response = await APIHandler('users/token', HTTPMethods.POST, credentials)
      
      if (response && response.access) {
        this.token = response.access
        this.refresh = response.refresh
        this.user = response.user

        saveState(StateKeys.ACCESS, response.access)
        saveState(StateKeys.REFRESH, response.refresh)
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
        this.user = null
        removeState(StateKeys.ACCESS)
        removeState(StateKeys.REFRESH)
        return true
      }
    }
  }
})
