import { createContext } from 'react'

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: token => {},
  logout: () => {}
})

export default AuthContext
