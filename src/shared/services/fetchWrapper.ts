import { Result, err, ok } from 'neverthrow'

export async function fetchWrapper<T>(
  url: string,
  options?: RequestInit
): Promise<Result<T, Error>> {
  try {
    const res = await fetch(url, options)
    const contentType = res.headers.get('content-type')
    const hasBody = contentType?.includes('application/json')

    const data = hasBody ? await res.json() : null

    if (!res.ok) {
      const message = (data && typeof data === 'object' && 'error' in data)
        ? data.error
        : 'Something went wrong'
      return err(new Error(message))
    }

    return ok(data as T)
  } catch (e) {
    return err(e instanceof Error ? e : new Error('Unexpected error'))
  }
}
