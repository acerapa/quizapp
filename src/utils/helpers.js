export const getState = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}

export const saveState = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const removeState = (key) => {
  window.localStorage.removeItem(key)
}

export const StateKeys = {
  ACCESS: 'access',
  REFRESH: 'refresh',
}
