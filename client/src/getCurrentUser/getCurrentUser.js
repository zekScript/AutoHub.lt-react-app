import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie'

export function getCurrentUser() {
  const token = Cookies.get('token')
  if (!token) return null

  try {
    const decoded = jwtDecode(token)
    return decoded
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}