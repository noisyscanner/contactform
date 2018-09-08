export default async function sendEmail (mailEndpoint, values) {
  const data = new URLSearchParams()
  Object.entries(values).forEach(p => data.append(...p))

  try {
    const response = await fetch(mailEndpoint, {
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
      throw {
        kind: 'validationError',
        errors: body.errors,
        context: response
      }
    }

    throw {
      kind: 'apiError',
      context: {
        response,
        body
      }
    }
  } catch (error) {
    if (error.kind) { throw error }

    throw {
      type: 'apiError',
      error
    }
  }
}
