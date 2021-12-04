import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CusGetProfile, CusUpdateProfile} from '../actions/userActions'


const ProfileScreen = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const CusProfile = useSelector(state => state.CusProfile)
    const { profile, getloading } = CusProfile

    const UpdateProfile = useSelector(state => state.UpdateProfile)
    const { loading, successRes, errorRes } = UpdateProfile

    const [username, setusername] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [personalIncome, setPersonalIncome] = useState(0)
    const [monthlySpending, setMonthlySpending] = useState('')
    const [avatar, setAvatar] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin')
        }
        else {
            if (!profile) {
                dispatch(CusGetProfile())
            }
            else {
                if (!profile.message) {
                    setFirstName(profile.firstName)
                    setLastName(profile.lastName)
                    setPersonalIncome(profile.personalIncome)
                    setMonthlySpending(profile.monthlySpending)
                    setusername(profile.user.username)
                    setEmail(profile.user.email)
                    setAvatar(profile.user.avatar)
                }
            }
        }

    }, [dispatch, navigate, userInfo, profile])

    const submitHandler = (e) => {
        e.preventDefault() //dispatch update profile
        dispatch(CusUpdateProfile({ firstName, lastName, personalIncome, monthlySpending }))

    }

    return (
        <>
            <article className='container'>
                <form className="row form" onSubmit={submitHandler}>
                    <div style={{ display: 'flex', justifyContent: 'center' }} className="container" >
                        <img src={avatar} alt="Girl in a jacket" width="100" height="100" />
                    </div>
                    <div className='col'>
                        <label className="form-label-wrapper">
                            <p className="form-label">UserName</p>
                            <input className="form-input" type="text" placeholder="your User name" disabled
                                value={username} onChange={e => setusername(e.target.value)} />
                        </label>
                        <label className="form-label-wrapper">
                            <p className="form-label">FirstName</p>
                            <input className="form-input" type="text" placeholder="Enter first name" required
                                value={firstName} onChange={e => setFirstName(e.target.value)} />
                        </label>
                        <label className="form-label-wrapper">
                            <p className="form-label">last name</p>
                            <input className="form-input" type="text" placeholder="Enter your last name" required
                                value={lastName} onChange={e => setLastName(e.target.value)} />
                        </label>
                    </div>
                    <div className='col'>
                        <label className="form-label-wrapper">
                            <p className="form-label">Email</p>
                            <input className="form-input" type="email" placeholder="Enter your email" disabled
                                value={email} onChange={e => setEmail(e.target.value)} />
                        </label>
                        <label className="form-label-wrapper">
                            <p className="form-label">Personal Income</p>
                            <input className="form-input" type="number" placeholder="enter your personal Income" required
                                value={personalIncome} onChange={e => setPersonalIncome(e.target.value)} />
                        </label>
                        <label className="form-label-wrapper">
                            <p className="form-label">monthly Spending</p>
                            <input className="form-input" type="text" placeholder="Enter your monthly Spending" required
                                value={monthlySpending} onChange={e => setMonthlySpending(e.target.value)} />
                        </label>
                    </div>
                    <button className="form-btn primary-default-btn transparent-btn" type='submit'>Update your Profile</button>
                    {firstName === '' && <div className='container' style={{ color: 'red', textAlign: 'center', fontSize: 25 }}>please update your profile</div>}
                    {successRes && <div className='container' style={{ color: 'springgreen', textAlign: 'center', fontSize: 25 }}>USER Updated !!</div>}
                    {errorRes && <div className='container' style={{ color: 'red', textAlign: 'center', fontSize: 25 }}>{errorRes.message}, {errorRes.details}</div>}
                    {loading && <div className='container' style={{ color: 'deepskyblue', textAlign: 'center', fontSize: 25 }}>loading...</div>}
                    {getloading && <div className='container' style={{ color: 'deepskyblue', textAlign: 'center', fontSize: 25 }}>loading...</div>}
                </form>
            </article>

        </>
    )
}

export default ProfileScreen
