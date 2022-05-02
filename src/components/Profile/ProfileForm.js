import { useRef, useContext } from 'react'
import AuthContext from '../../store/auth_context'
import { urlChangePassword } from '../../api/index'
import classes from './ProfileForm.module.css'

const ProfileForm = () => {
  const { token } = useContext(AuthContext)
  const newPasswordInputRef = useRef()

  const submitHandler = event => {
    event.preventDefault()

    const enteredNewPassword = newPasswordInputRef.current.value

    console.log({ urlChangePassword, enteredNewPassword })

    // optional: Add validation
    fetch(urlChangePassword, {
      method: 'POST',
      body: JSON.stringify({
        idToken: token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        // assuming theres no error
        alert('Success')
        console.log(res)
      })
      .catch(err => {
        alert(err)
      })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          ref={newPasswordInputRef}
          type='password'
          id='new-password'
          minLength='7'
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm
