import { useContext } from 'react'
import AuthContext from './store/auth_context'
import { Switch, Route, Redirect } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import UserProfile from './components/Profile/UserProfile'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'

function App() {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        {/* {isLoggedIn && (
          <Route path='/profile'>
            <UserProfile />
          </Route>
        )} */}
        <Route path='/profile'>
          {isLoggedIn ? <UserProfile /> : <Redirect to='/auth' />}
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
