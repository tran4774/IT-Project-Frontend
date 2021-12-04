import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CusGetProfile } from '../actions/userActions'

function Main() {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const CusProfile = useSelector(state => state.CusProfile)
  const { profile, getloading } = CusProfile

  const [totalDaily, setTotalDaily] = useState()
  const [totalMonthly, setTotalMonthly] = useState()

  useEffect(() => {
    if (userInfo) {
      if (!profile) {
        dispatch(CusGetProfile())

      }
      else {
        setTotalDaily(profile.totalDaily)
        setTotalMonthly(profile.totalMonthly)
      }
    }

  }, [dispatch, userInfo, profile])


  return (
    <>
      <main className="main users chart-page" id="skip-target">
        <div className="container">
          <h2 className="main-title">Dashboard</h2>
          <div className="row stat-cards">
            <div className="col-md-6 col-xl-3">
              <article className="stat-cards-item">
                <div className="stat-cards-icon primary">
                  <i data-feather="bar-chart-2" aria-hidden="true" />
                </div>
                <div className="stat-cards-info">
                  <p className="stat-cards-info__num">{totalDaily}</p>
                  <p className="stat-cards-info__title">Total Daily</p>
                  <p className="stat-cards-info__progress">
                    <span className="stat-cards-info__profit success">
                      <i data-feather="trending-up" aria-hidden="true" />{totalDaily}
                    </span>
                  </p>
                </div>
              </article>
            </div>
            <div className="col-md-6 col-xl-3">
              <article className="stat-cards-item">
                <div className="stat-cards-icon warning">
                  <i data-feather="file" aria-hidden="true" />
                </div>
                <div className="stat-cards-info">
                  <p className="stat-cards-info__num">{totalMonthly}</p>
                  <p className="stat-cards-info__title">Total Monthly</p>
                  <p className="stat-cards-info__progress">
                    <span className="stat-cards-info__profit success">
                      <i data-feather="trending-up" aria-hidden="true" />{totalMonthly}
                    </span>
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Main
