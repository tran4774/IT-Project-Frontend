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
import {
  IMAGE_IMPORT_FAIL,
  IMAGE_IMPORT_SUCCESS,
} from "../constants/uploadImageConstant";

export const importImageReducer = (state = { upImage: null }, action) => {
  switch (action.type) {

    case IMAGE_UPLOAD_REQUEST:
        return{
            loading:true
        }
    case IMAGE_UPLOAD_SUCCESS:
    
    return {
        loading:false,
        upImage: action.payload,
      };

    case IMAGE_UPLOAD_FAIL:
      return {
        loading:false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateImageReducer = (state = { putImage: null }, action) => {
  switch (action.type) {

    case IMAGE_UPDATE_REQUEST:
        return{
            loading:true
        }
    case IMAGE_UPDATE_SUCCESS:
    
    return {
        loading:false,
        putImage: action.payload,
      };

    case IMAGE_UPDATE_FAIL:
      return {
        loading:false,
        error: action.payload,
      };
    default:
      return state;
  }
};
