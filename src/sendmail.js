import { ValidationError, ApiError } from './errors'
import 'whatwg-fetch'

export default async function sendEmail (mailEndpoint, values) {
  const data = new URLSearchParams()
  Object.entries(values).forEach(p => data.append(...p))

  try {
    const response = await window.fetch(mailEndpoint, {
      method: 'post',
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    })

    if (response.ok) return response

    const body = await response.json()

    if (response.status === 400) {
      throw new ValidationError(body.errors)
    }

    throw new ApiError(body)
  } catch (error) {
    if (error instanceof ValidationError || error instanceof ApiError) { throw error }

    throw new ApiError(error)
  }
}
