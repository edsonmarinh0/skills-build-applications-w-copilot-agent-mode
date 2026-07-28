const getApiBaseUrl = () => {
  const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME
  if (codeSpaceName) {
    return `https://${codeSpaceName}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

const getItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items
  }

  return []
}

export { getApiBaseUrl, getItems }
