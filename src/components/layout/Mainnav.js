import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'
function Mainnav() {

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <>
      <nav className="main-nav--bg">
        <div className="container main-nav">
          <div className="main-nav-start">
          </div>
          <div className="main-nav-end">
            <button className="sidebar-toggle transparent-btn" title="Menu" type="button">
              <span className="sr-only">Toggle menu</span>
              <span className="icon menu-toggle--gray" aria-hidden="true" />
            </button>
            <div className="lang-switcher-wrapper">
              {userInfo ? (
                <div className="notification-wrapper">
                  <button className="gray-circle-btn dropdown-btn" title="To messages" type="button">
                    <span>{userInfo.name}</span>
                  </button>
                  <ul className="users-item-dropdown notification-dropdown dropdown">
                    <li>
                      <a href="/customerprofile">
                        <i data-feather="user" aria-hidden="true" />
                        <span>Customer Profile</span>
                      </a>
                    </li>
                    <li>
                      <a className="danger" href="/#" >
                        <i data-feather="log-out" aria-hidden="true" />
                        <span onClick={logoutHandler}>Log out</span>
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (<div>

                <a href="/signin"><span style={{ color: 'royalblue' }}>Login&#160;&#160;</span></a>
                <a href="/signup"><span style={{ color: 'royalblue' }}>Register</span></a></div>)}
            </div>
            <button className="theme-switcher gray-circle-btn" type="button" title="Switch theme">
              <span className="sr-only">Switch theme</span>
              <i className="sun-icon" data-feather="sun" aria-hidden="true" />
              <i className="moon-icon" data-feather="moon" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Mainnav
