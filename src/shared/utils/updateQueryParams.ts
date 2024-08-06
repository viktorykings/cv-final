export const updateQueryParams = (params: URLSearchParams, key: string, value?: string) => {
  if (value) {
    params.set(key, value)
  } else {
    params.delete(key)
  }
}
