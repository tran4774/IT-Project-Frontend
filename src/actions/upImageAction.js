import axios from "axios";
import Bill1 from "../data/Bill1";
import update1 from "../data/update1";
import {
  IMAGE_UPLOAD_FAIL,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
} from "../constants/uploadImageConstant";
import {
  IMAGE_UPDATE_FAIL,
  IMAGE_UPDATE_REQUEST,
  IMAGE_UPDATE_SUCCESS,
} from "../constants/uploadImageConstant";


export const uploadImage = (image,type) => async (dispatch,getState) => {
  try {
  
    dispatch({
      type: IMAGE_UPLOAD_REQUEST,
    });
    const fd = new FormData();
    fd.append("file", image);
    fd.append("type", type);

   
    const {userLogin:{userInfo}}=getState()
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    let url = "https://paymentmanagerment.herokuapp.com/api/payment";
    const { data } = await axios.post(url, fd, config);
    // const data= Bill1;
    dispatch({
      type: IMAGE_UPLOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: IMAGE_UPLOAD_FAIL,
      payload:   error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
  }
};

export const updateImage = (image) => async (dispatch,getState) => {
  try {
  
    dispatch({
      type: IMAGE_UPDATE_REQUEST,
    });
    
    const {userLogin:{userInfo}}=getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`

      },
    };
    
    image=JSON.stringify(image);
    console.log(image);
    let url = "https://paymentmanagerment.herokuapp.com/api/handPayment";
   const { data } = await axios.post(url, image, config);
    // const data= update1;
    dispatch({
      type: IMAGE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: IMAGE_UPDATE_FAIL,
      payload:   error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
  }
};
