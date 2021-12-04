import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { list_M_Noti, update_MNoti } from '../actions/userActions'


const MonthlySetupScreen = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const listM_Noti = useSelector(state => state.listM_Noti)
    const { MrEs, Mloading } = listM_Noti

    const updateM_noti = useSelector(state => state.updateM_noti)
    const { uMloading, uMrEs, uMerr } = updateM_noti

    const [mNameMoney, setmNameMoney] = useState('')
    const [mMoney, setmMoney] = useState('')
    const [mDescription, setmDescription] = useState('')
    const [mDate, setmDate] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin')
        }
        else {
            if (!MrEs) {
                dispatch(list_M_Noti())
            }
            else {
                if (!MrEs.message) {
                    setmMoney(MrEs.money)
                    setmNameMoney(MrEs.nameMoney)
                    setmDescription(MrEs.description)
                    setmDate(MrEs.date.slice(0, 10))
                }
            }
        }
    }, [dispatch, navigate, userInfo, MrEs])

    const updateM = (e) => {
        e.preventDefault() //dispatch update profile
        dispatch(update_MNoti(mNameMoney, mMoney, mDescription))

    }

    return (
        <>
            <article style={{ display: 'flex', width: '80%' }} className='container'>

                <form className="col form" onSubmit={updateM}>
                    <h1 style={{ color: 'crimson', textAlign: 'center' }}>Monthly Notification</h1>
                    <div className='col'>
                        <label className="form-label-wrapper">
                            <p className="form-label">Monthly Spend</p>
                            <input className="form-input" type="text" placeholder="Enter your Monthly Spend" required
                                value={mMoney} onChange={e => setmMoney(e.target.value)} />
                        </label>
                        <label className="form-label-wrapper">
                            <p className="form-label">Currency</p>
                            <input className="form-input" type="text" placeholder="Enter you Currency" required
                                value={mNameMoney} onChange={e => setmNameMoney(e.target.value)} />
                        </label>
                        <label className="form-label-wrapper">
                            <p className="form-label">Last update</p>
                            <input className="form-input" type="date" disabled value={mDate} />
                        </label>
                        <label className="form-label-wrapper">
                            <p className="form-label">description</p>
                            <input className="form-input" type="text" placeholder="Enter description" required
                                value={mDescription} onChange={e => setmDescription(e.target.value)} />
                        </label>
                    </div>
                    <input style={{ marginTop: '20px', backgroundColor: 'mediumseagreen' }}
                        className="form-btn primary-default-btn transparent-btn" type='button'
                        value={'Update Daily Notification'} onClick={updateM} />

                    {Mloading && <div className='container' style={{ color: 'deepskyblue', textAlign: 'center', fontSize: 25 }}>loading...</div>}
                    {uMloading && <div className='container' style={{ color: 'deepskyblue', textAlign: 'center', fontSize: 25 }}>loading...</div>}
                    {uMerr && <div className='container' style={{ color: 'red', textAlign: 'center', fontSize: 25 }}>Please update your profile</div>}
                    {uMrEs && <div className='container' style={{ color: 'green', textAlign: 'center', fontSize: 25 }}>Update Success</div>}

                </form>
            </article>
        </>
    )
}

export default MonthlySetupScreen
