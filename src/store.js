import thunk from "redux-thunk"
import {importImageReducer,updateImageReducer} from "./reducers/imageReducers"
import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { userLoginReducer, 
    userRegisterReducer, CusProfileReducer, UpdateProfileReducer, 
    getPaymentReducer, cusDelePaymentReducer, listDNotiReducer, listMNotiReducer,
    updateDNotiReducer, updateMNotiReducer } from "./reducers/userReducers"

const reducer= combineReducers({
    userLogin :userLoginReducer,
    userRegister: userRegisterReducer,
    uploadImage:importImageReducer,
    updateImage:updateImageReducer,
    CusProfile: CusProfileReducer,
    UpdateProfile: UpdateProfileReducer,
    getPayment: getPaymentReducer,
    delePayment: cusDelePaymentReducer,
    listD_Noti: listDNotiReducer,
    listM_Noti: listMNotiReducer,
    updateD_noti: updateDNotiReducer,
    updateM_noti: updateMNotiReducer,

})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store