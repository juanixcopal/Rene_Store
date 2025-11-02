const ExecutionPermit = ({ response }) => {
  if (!response) {
    console.error('No response object provided to ExecutionPermit')
    return
  }

  if (response.status === 401) {
    localStorage.clear()
    window.location.reload()
    window.location.href = '/login'
  } else if (response.status === 403) {
    window.location.href = '/store'
  } else {
    console.error('Unhandled status code in ExecutionPermit:', response.status)
  }
}

export default ExecutionPermit
