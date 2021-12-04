import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
function SignupScreen() {

  const dispatch = useDispatch()
  const userRegister = useSelector(state => state.userRegister)
  const { loading, errorRes, successRes } = userRegister

  const [username, setusername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')


  const submitHandler = (e) => {
    e.preventDefault() //dispatch register
    dispatch(register(username, password, email))

  }
  return (
    <>
      <div>
        <div className="layer" />
        <main className="page-center">
          <article className="sign-up">
            <h1 className="sign-up__title">Get started</h1>
            <p className="sign-up__subtitle">Start creating the best possible user experience for you customers</p>
            <form className="sign-up-form form" onSubmit={submitHandler}>
              <label className="form-label-wrapper">
                <p className="form-label">Name</p>
                <input className="form-input" type="text" placeholder="Enter your name" required
                  value={username} onChange={e => setusername(e.target.value)} />
              </label>
              <label className="form-label-wrapper">
                <p className="form-label">Email</p>
                <input className="form-input" type="email" placeholder="Enter your email" required
                  value={email} onChange={e => setEmail(e.target.value)} />
              </label>
              <label className="form-label-wrapper">
                <p className="form-label">Password</p>
                <input className="form-input" type="password" placeholder="Enter your password" required
                  value={password} onChange={e => setPassword(e.target.value)} />
              </label>
              <button className="form-btn primary-default-btn transparent-btn" type='submit'>Sign in</button>
            </form>
          </article>
          {successRes && <h2 style={{color:'springgreen', marginTop:'30px'}}>USER Created !!</h2>}
          {errorRes && <h2 style={{color:'red', marginTop:'30px'}}>
            {errorRes.message}, {errorRes.details}</h2>}
          {loading && <h2 style={{ color: 'deepskyblue', marginTop: '30px' }}>loading...</h2>}
        </main>
      </div>
    </>
  )
}

export default SignupScreen