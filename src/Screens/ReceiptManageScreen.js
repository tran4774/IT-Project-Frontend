import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CusDeletePayment, cusGetType } from '../actions/userActions'

function ItemsLinesModal(props) {
    const ItemLines = props.data;
    const ItemLineDetails = ItemLines.map((ItemLine) =>
        <div>
            <div style={{ textAlign: 'center' }} className='row'>
                <h3 style={{ color: 'skyblue', marginTop: '5px', marginBottom: '5px' }} className='col'>{ItemLine.item}</h3>
                <h3 style={{ color: 'gainsboro', marginTop: '5px' }} className='col'>{ItemLine.price}</h3>
            </div>
        </div>

    );
    return (ItemLineDetails);
}

function SpecialFieldsModal(props) {
    const Specialfields = props.data;
    const SpecialfieldsDetails = Specialfields.map((Specialfield) =>
        <div>
            <div style={{ textAlign: 'center' }} className='row'>
                <h3 style={{ color: 'peru', marginTop: '5px', marginBottom: '5px' }} className='col'>{Specialfield.fieldName}</h3>
                <h3 style={{ color: 'gainsboro', marginTop: '5px', marginBottom: '5px' }} className='col'>{Specialfield.value}</h3>
            </div>
        </div>

    );
    return (SpecialfieldsDetails);
}

function SummaryFieldsModal(props) {
    const SummaryFields = props.data;
    const SummaryFieldsDetails = SummaryFields.map((SummaryField) =>
        <div>
            <div style={{ textAlign: 'center' }} className='row'>
                <h3 style={{ color: 'plum', marginTop: '5px', marginBottom: '5px' }} className='col'>{SummaryField.fieldName}</h3>
                <h3 style={{ color: 'gainsboro', marginTop: '5px', marginBottom: '5px' }} className='col'>{SummaryField.value}</h3>
            </div>
        </div>

    );
    return (SummaryFieldsDetails);
}

function PaymentListing(props) {

    const allPayment = props.data;

    function toggleEdit(e) {
        var x = document.getElementById(e).style.display
        if (x === 'block') {
            document.getElementById(e).style.display = 'none'
        }
        else {
            document.getElementById(e).style.display = 'block'
        }
    }

    const listPayments = allPayment.map((payment) =>
        <div>
            <div style={{ textAlign: 'center' }} className='row'>
                <h3 style={{ color: 'slateblue', paddingTop: '10px' }} className='col'><a rel="noreferrer" target="_blank" href={payment.imageBill}>Image</a></h3>
                <h3 style={{ color: 'slateblue', paddingTop: '10px' }} className='col'>{payment.uploadDate}</h3>
                <h3 style={{ color: 'slateblue', paddingTop: '10px' }} className='col'>{payment.type}</h3>
                <h3 style={{ paddingTop: '10px' }} className='col'><input value={payment.id} type='checkbox' onChange={props.onChange} /></h3>
                <h3 style={{ paddingTop: '10px' }} className='col'><input value={payment.id} type='button' onClick={e => toggleEdit(e.target.value)} /></h3>
            </div>
            <div id={payment.id} style={{ display: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className='form'>
                        <h2 style={{ color: 'mediumseagreen', marginBottom: '5px', textAlign: 'center' }}>Items Lines</h2>
                        <ItemsLinesModal data={payment.itemLines} />
                    </div>
                    <div className='form'>
                        <h2 style={{ color: 'crimson', marginBottom: '5px', textAlign: 'center' }}>Special Fields</h2>
                        <SpecialFieldsModal data={payment.specialFields} />
                    </div>
                    <div className='form'>
                        <h2 style={{ color: 'aqua', marginBottom: '5px', textAlign: 'center' }}>Summary Fields</h2>
                        <SummaryFieldsModal data={payment.summaryFields} />
                    </div>
                </div>
            </div>
        </div>

    );
    return (listPayments);
}

const ReceiptManage = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const getPayment = useSelector(state => state.getPayment)
    const { getPaymentLoading, allPayment } = getPayment

    const delePayment = useSelector(state => state.delePayment)
    const { deleLoading, deleSuccess, DeleFail } = delePayment

    const [paymentType, setPaymentType] = useState('DAILY')

    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin')
        }

    }, [dispatch, navigate, userInfo])


    const searchHandler = (e) => {
        e.preventDefault()
        dispatch(cusGetType(paymentType))
    }

    const [ids, setIds] = useState([])

    const checkHandler = (e) => {
        const isChecked = e.target.checked

        if (isChecked) {
            if (!ids.includes(e.target.value)) {
                setIds([...ids, e.target.value])
            }
        }
        else {
            if (ids.includes(e.target.value)) {
                let index = ids.indexOf(e.target.value)
                ids.splice(index, 1)
            }
        }
    }

    const deleteHandler = (e) => {
        e.preventDefault()
        dispatch(CusDeletePayment(ids))
    }

    return (
        <>
            {/* save receipt */}
            <article className='container'>
                <form className="row form" >
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }} className='container'>
                        <h1 style={{ color: 'firebrick', textAlign: 'center', marginRight: '10px' }}>Saved Receipt</h1>
                        <select name="type" id="type" onChange={e => setPaymentType(e.target.value)}>
                            <option value="DAILY">DAILY</option>
                            <option value="MONTHLY">MONTHLY</option>
                        </select>
                        <button onClick={searchHandler}>Search</button>
                    </div>
                    {getPaymentLoading && <div className='container' style={{ color: 'deepskyblue', textAlign: 'center', fontSize: 25 }}>loading...</div>}
                    <button className="form-btn primary-default-btn" style={{ backgroundColor: 'firebrick' }} onClick={deleteHandler}>Delete</button>
                </form>
                <form className="row form" >
                    <label className="container col">
                        <div style={{ color: 'darkcyan', textAlign: 'center' }} className='row'>
                            <h2 style={{ color: 'lightseagreen' }} className='col'>Link</h2>
                            <h2 style={{ color: 'lightseagreen' }} className='col'>CreatedDate</h2>
                            <h2 style={{ color: 'lightseagreen' }} className='col'>Type</h2>
                            <h2 style={{ color: 'lightseagreen' }} className='col'>TicktoDelete</h2>
                            <h2 style={{ color: 'lightseagreen' }} className='col'>ClickforDetails</h2>
                        </div>
                        {allPayment && <PaymentListing data={allPayment} onChange={checkHandler} />}
                        {deleLoading && <div className='container' style={{ color: 'deepskyblue', textAlign: 'center', fontSize: 25 }}>loading...</div>}
                        {deleSuccess && <div className='container' style={{ color: 'springgreen', textAlign: 'center', fontSize: 25 }}>Delete Complete !!</div>}
                        {DeleFail && <div className='container' style={{ color: 'red', textAlign: 'center', fontSize: 25 }}>{DeleFail.message}, {DeleFail.details}</div>}
                    </label>
                </form>
            </article>
        </>
    )
}

export default ReceiptManage
