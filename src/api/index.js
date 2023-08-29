import { StateKeys, getState, saveState, removeState } from '../utils/helpers'

export function APIHandler (url, method = HTTPMethods.GET, data = null, headers = null) {
  // const basePath = 'http://localhost:8000/api/'
  const basePath = 'https://quizapp-r85p.onrender.com/api/'

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  return fetch(`${basePath}${url}`, options)
    .then( async response => {
      const data = await response.json()
      data['status'] = response.status
      return data
    })
    .catch(error => {
      console.log(error)
    })
}

export const HTTPMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}


export const verfiyToken = async () => {
  const access = getState(StateKeys.ACCESS)
  const refresh = getState(StateKeys.REFRESH)
  let response = await APIHandler('users/token/verify', HTTPMethods.POST, { token: access })
  
  if (response.status !== 200) {
    console.clear();
    const refreshResponse = await APIHandler('users/token/verify', HTTPMethods.POST, { token: refresh })
    if (refreshResponse.status !== 200) {
      removeState(StateKeys.ACCESS)
      removeState(StateKeys.REFRESH)
      return false;

    } else {
      response = await APIHandler('users/token/refresh', HTTPMethods.POST, { refresh: refresh })
      saveState(StateKeys.ACCESS, response.access)
      saveState(StateKeys.REFRESH, response.refresh)
      return true;
    }
  }

  return true
}