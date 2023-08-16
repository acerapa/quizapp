export default {
  getState: (key) => {
    return JSON.parse(window.localStorage.getItem(key))
  },

  saveState: (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  removeState: (key) => {
    window.localStorage.removeItem(key)
  }
}
