import { useState, useEffect, useCallback } from 'react'
import AuthContext from './auth_context'

// this could be in a service
const calculateRemainingTime = expirationTime => {
  const currenTime = new Date().getTime()
  const adjExpirationTime = new Date(expirationTime).getTime()

  const remainingTime = adjExpirationTime - currenTime

  return remainingTime
}

let logoutTimer

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token')
  const storedExpirationDate = localStorage.getItem('expirationTime')

  const remainingTime = calculateRemainingTime(storedExpirationDate)

  if (remainingTime <= 60000) {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    return null
  }

  return { token: storedToken, duration: remainingTime }
}

export const AuthProvider = ({ children }) => {
  const tokenData = retrieveStoredToken()
  const initialToken = tokenData ? tokenData.token : null
  const [token, setToken] = useState(initialToken)

  // !!token is a boolean that is true if token is a string is not empty, and false if is a empty string.
  const userIsLoggenIn = !!token

  const logoutHandler = useCallback(() => {
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')

    // clear the logout timer if user want to logout manually
    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }, [])

  const loginHandler = (token, expirationTime) => {
    setToken(token)
    localStorage.setItem('token', token)
    // expirationTime has to be String and it is, in fact, a string(comes from where is passed it from)
    localStorage.setItem('expirationTime', expirationTime)

    const remainingTime = calculateRemainingTime(expirationTime)

    // setTimeout return a reference we save it in logoutTimer
    logoutTimer = setTimeout(logoutHandler, remainingTime)
  }

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration)
    }
  }, [tokenData, logoutHandler])

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
