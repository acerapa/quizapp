export function APIHandler (url, method = HTTPMethods.GET, data = null, headers = null) {
  const basePath = 'http://localhost:8000/api/'

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
    .then(response => {
      return response.json()
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
