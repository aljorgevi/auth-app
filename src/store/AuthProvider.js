import { useState } from 'react'
import AuthContext from './auth_context'

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)

  // !!token is a boolean that is true if token is a string is not empty, and false if is a empty string.
  const userIsLoggenIn = !!token

  const loginHandler = token => {
    setToken(token)
  }

  const logoutHandler = () => {
    setToken(null)
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
