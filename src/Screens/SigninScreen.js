import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { login } from '../actions/userActions'
function SigninScreen() {

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const location = useLocation()
  const navigate = useNavigate()
  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault() //dispatch login
    dispatch(login(username, password))
  }

  return (
    <>
      <div>
        <div className="layer" />
        <main className="page-center">
          <article className="sign-up">
            <h1 className="sign-up__title">Welcome back!</h1>
            <p className="sign-up__subtitle">
              Sign in to your account to continue
            </p>
            <form className="sign-up-form form" onSubmit={submitHandler}>
              <label className="form-label-wrapper">
                <p className="form-label">UserName</p>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Enter your Username"
                  required
                  value={username} onChange={e => setUserName(e.target.value)}
                />
              </label>
              <label className="form-label-wrapper">
                <p className="form-label">Password</p>
                <input
                  className="form-input"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password} onChange={e => setPassword(e.target.value)}
                />
              </label>
              <a className="link-info forget-link" href="/#">
                Forgot your password?
              </a>
              <button className="form-btn primary-default-btn transparent-btn" type='submit'>
                Sign in
              </button>
            </form>
          </article>
          {loading && <h2 style={{ color: 'deepskyblue', marginTop: '30px' }}>loading...</h2>}
          {error && <h2 style={{ color: 'red', marginTop: '30px' }}>{error.message}, {error.details}</h2>}
        </main>
      </div>
    </>
  );
}

export default SigninScreen;
