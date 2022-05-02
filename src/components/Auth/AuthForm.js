import { useState, useRef } from 'react'

import classes from './AuthForm.module.css'

const urlSignUp = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`
const urlLogin = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`

const AuthForm = () => {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState)
  }

  const submitHandler = event => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    // optional: Add validation

    setIsLoading(true)
    let url
    isLogin ? (url = urlLogin) : (url = urlSignUp)

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        setIsLoading(false)
        if (res.ok) {
          return res.json()
        } else {
          return res.json().then(data => {
            // show an error modal
            let errorMessage = 'Authentication failed'
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message
            }
            // thowing an error here will cause the app to crash so we need to handle it in the catch.
            throw new Error(errorMessage)
          })
        }
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
        alert(err.message)
      })
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            ref={passwordInputRef}
            type='password'
            id='password'
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>is Loading....</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm
