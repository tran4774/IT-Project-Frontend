import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { list_D_Noti, update_DNoti } from '../actions/userActions'


const DailySetupScreen = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const listD_Noti = useSelector(state => state.listD_Noti)
    const { DrEs, Dloading } = listD_Noti

    const updateD_noti = useSelector(state => state.updateD_noti)
    const { uDloading, uDrEs, uDerr } = updateD_noti

    const [dNameMoney, setdNameMoney] = useState()
    const [dMoney, setdMoney] = useState()
    const [dDescription, setdDescription] = useState()
    const [dDate, setdDate] = useState()


    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin')
        }
        else {
            if (!DrEs) {
                dispatch(list_D_Noti())
            }
            else {
                if (!DrEs.message) {
                    setdMoney(DrEs.money)
                    setdNameMoney(DrEs.nameMoney)
                    setdDescription(DrEs.description)
                    setdDate(DrEs.date.slice(0, 10))
                }
            }
        }

    }, [dispatch, navigate, userInfo, DrEs])

    const updateD = (e) => {
        e.preventDefault() //dispatch update profile
        dispatch(update_DNoti(dNameMoney, dMoney, dDescription))

    }


    return (
        <>
            <article style={{ display: 'flex', width: '80%' }} className='container'>
                <form className="col form">
                    <h1 style={{ color: 'mediumslateblue', textAlign: 'center' }}>Daily Notification</h1>
                    <div className='col'>
                        <label className="form-label-wrapper">
                            <p className="form-label">Daily Spend</p>
                            <input className="form-input" type="text" placeholder="Enter your Daily Spend"
                                value={dMoney} onChange={e => setdMoney(e.target.value)} />
                        </label>
                        <label className="form-label-wrapper">
                            <p className="form-label">Currency</p>
                            <input className="form-input" type="text" placeholder="Enter you Currency"
                                value={dNameMoney} onChange={e => setdNameMoney(e.target.value)} />
                        </label>
                        <label className="form-label-wrapper">
                            <p className="form-label">Last update</p>
                            <input className="form-input" type="date" disabled value={dDate} />
                        </label>
                        <label className="form-label-wrapper">
                            <p className="form-label">description</p>
                            <input className="form-input" type="text" placeholder="Enter description"
                                value={dDescription} onChange={e => setdDescription(e.target.value)} />
                        </label>
                    </div>
                    <input style={{ marginTop: '20px', backgroundColor: 'mediumseagreen' }}
                        className="form-btn primary-default-btn transparent-btn" type='button'
                        value={'Update Daily Notification'} onClick={updateD} />

                    {Dloading && <div className='container' style={{ color: 'deepskyblue', textAlign: 'center', fontSize: 25 }}>loading...</div>}
                    {uDloading && <div className='container' style={{ color: 'deepskyblue', textAlign: 'center', fontSize: 25 }}>loading...</div>}
                    {uDerr && <div className='container' style={{ color: 'red', textAlign: 'center', fontSize: 25 }}>Please update your profile</div>}
                    {uDrEs && <div className='container' style={{ color: 'green', textAlign: 'center', fontSize: 25 }}>Update Success</div>}
                </form>

            </article>
        </>
    )
}

export default DailySetupScreen
