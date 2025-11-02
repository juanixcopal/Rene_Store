import axios from 'axios'

export const instanceAPIInvitaPRO = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE}/v2`,
  headers: {
    'Content-Type': 'application/json',
    token: localStorage.getItem('token')
  }
})
