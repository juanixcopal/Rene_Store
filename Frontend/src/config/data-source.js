import axios from 'axios'

export const instanceAPIRenielStore = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE}/api`,
  headers: {
    'Content-Type': 'application/json',
    token: localStorage.getItem('token')
  }
})
