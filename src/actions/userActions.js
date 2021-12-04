import {

    CUSGET_PROFILE_REQUEST,
    CUSGET_PROFILE_SUCCESS,
    CUSGET_PROFILE_FAIL,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    CUSUPDATE_PROFILE_REQUEST,
    CUSUPDATE_PROFILE_SUCCESS,
    CUSUPDATE_PROFILE_FAIL,
    CUSGET_PAYMENT_REQUEST,
    CUSGET_PAYMENT_SUCCESS,
    CUSGET_PAYMENT_FAIL,
    CUSDELE_PAYMENT_REQUEST,
    CUSDELE_PAYMENT_SUCCESS,
    CUSDELE_PAYMENT_FAIL,
    LIST_D_NOTI_REQUEST,
    LIST_D_NOTI_SUCCESS,
    LIST_D_NOTI_FAIL,
    LIST_M_NOTI_FAIL,
    LIST_M_NOTI_SUCCESS,
    LIST_M_NOTI_REQUEST,
    UPDATE_D_NOTI_REQUEST,
    UPDATE_D_NOTI_SUCCESS,
    UPDATE_D_NOTI_FAIL,
    UPDATE_M_NOTI_REQUEST,
    UPDATE_M_NOTI_SUCCESS,
    UPDATE_M_NOTI_FAIL,
} from "../constants/userConstants"
import axios from 'axios'

const URL = 'https://paymentmanagerment.herokuapp.com'

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            `${URL}/api/signin`,
            { username, password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
};

export const register = (username, password, email) => async (dispatch) => {

    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`${URL}/api/signup`, { username, password, email }, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        console.log(data)

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.data
        })
    }
}

export const CusGetProfile = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CUSGET_PROFILE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`${URL}/api/customerprofile`, config)

        dispatch({
            type: CUSGET_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CUSGET_PROFILE_FAIL,
            payload: error.response.data
        })
    }
}


export const CusUpdateProfile = (updateData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CUSUPDATE_PROFILE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`${URL}/api/customer`, updateData, config)

        dispatch({
            type: CUSUPDATE_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CUSUPDATE_PROFILE_FAIL,
            payload: error.response.data
        })
    }
}

export const cusGetPayment = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CUSGET_PAYMENT_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get(`${URL}/api/payment`, config)

        dispatch({
            type: CUSGET_PAYMENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CUSGET_PAYMENT_FAIL,
            payload: error.response.data
        })
    }
}

export const cusGetType = (paymentType) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CUSGET_PAYMENT_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        var bodyFormData = new FormData();
        bodyFormData.append('type', paymentType);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`${URL}/api/paymentOfCustomer`, bodyFormData, config)

        dispatch({
            type: CUSGET_PAYMENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CUSGET_PAYMENT_FAIL,
            payload: error.response.data
        })
    }
}



export const CusDeletePayment = (deleids) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CUSDELE_PAYMENT_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
            data: {
                ids: deleids
            }
        }
        const { data } = await axios.delete(`${URL}/api/payment`, config)

        dispatch({
            type: CUSDELE_PAYMENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CUSDELE_PAYMENT_FAIL,
            payload: error.response.data
        })
    }
}

export const list_D_Noti = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_D_NOTI_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`${URL}/api/dailyOfCustomer`, config)

        dispatch({
            type: LIST_D_NOTI_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LIST_D_NOTI_FAIL,
            payload: error.response.data
        })
    }
}

export const list_M_Noti = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_M_NOTI_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`${URL}/api/monthOfCustomer`, config)

        dispatch({
            type: LIST_M_NOTI_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LIST_M_NOTI_FAIL,
            payload: error.response.data
        })
    }
}

export const update_DNoti = (nameMoney, money, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_D_NOTI_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`${URL}/api/daily`, { nameMoney, money, description }, config)

        dispatch({
            type: UPDATE_D_NOTI_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_D_NOTI_FAIL,
            payload: error.response.data
        })
    }
}

export const update_MNoti = (nameMoney, money, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_M_NOTI_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`${URL}/api/month`, { nameMoney, money, description }, config)

        dispatch({
            type: UPDATE_M_NOTI_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_M_NOTI_FAIL,
            payload: error.response.data
        })
    }
}

