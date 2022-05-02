import { useState } from 'react'
import AuthContext from './auth_context'

// this could be in a service
const calculateRemainingTime = expirationTime => {
  const currenTime = new Date().getTime()
  const adjExpirationTime = new Date(expirationTime).getTime()

  const remainingTime = adjExpirationTime - currenTime

  return remainingTime
}

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem('token')
  const [token, setToken] = useState(initialToken)

  // !!token is a boolean that is true if token is a string is not empty, and false if is a empty string.
  const userIsLoggenIn = !!token

  const logoutHandler = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  const loginHandler = (token, expirationTime) => {
    setToken(token)
    localStorage.setItem('token', token)

    const remainingTime = calculateRemainingTime(expirationTime)

    setTimeout(logoutHandler, remainingTime)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn: userIsLoggenIn,
        login: loginHandler,
        logout: logoutHandler
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
