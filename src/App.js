import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SigninScreen from "./Screens/SigninScreen";
import SignupScreen from "./Screens/SignupScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import Slidebar from "./components/layout/Slidebar";
import Main from "./components/Main";
import Mainnav from "./components/layout/Mainnav";
import Textract from "./Screens/Textract";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./actions/userActions";
import jwt_decode from "jwt-decode";
import ReceiptManage from "./Screens/ReceiptManageScreen";
import DailySetupScreen from "./Screens/DailySetupScreen";
import MonthlySetupScreen from "./Screens/MonthlySetupScreen";
function App() {

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  if (userInfo) {
    var curToken = jwt_decode(userInfo.token)
    if (curToken.exp * 1000 < Date.now()) {
      dispatch(logout())
    }
  }

  return (
    <BrowserRouter>
      <div>
        <div className="layer" />
        <a className="skip-link sr-only" href="#skip-target">
          Skip to content
        </a>

        <div className="page-flex">
          <Slidebar />
          <div className="main-wrapper">
            <Mainnav />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/textract" element={<Textract />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/customerprofile" element={<ProfileScreen />} />
              <Route path="/receiptmanage" element={<ReceiptManage />} />
              <Route path="/daily" element={<DailySetupScreen />} />
              <Route path="/monthly" element={<MonthlySetupScreen />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
