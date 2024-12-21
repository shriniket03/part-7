import { configureStore } from "@reduxjs/toolkit";
import notifReducer, { setMessage } from "./reducers/notifReducer";
import blogService from "./services/blogs";
import getLogin from "./services/login";
import postReducer, {
  setBlogs
} from "./reducers/postReducer";
import userReducer, {setUser} from './reducers/userReducer'
import usersReducer, {setUsersRed} from './reducers/usersReducer'
const store = configureStore({
  reducer: {
    notification: notifReducer,
    blogs: postReducer,
    user: userReducer,
    users: usersReducer
  },
});

export const setNotification = (msg) => {
  return async (dispatch) => {
    dispatch(setMessage(msg));
    setTimeout(() => dispatch(setMessage({ msg: null, type: null })), 5000);
  };
};

export const initBlog = () => {
  return async (dispatch) => {
    const arr = await blogService.getAll();
    dispatch(setBlogs(arr.sort((a, b) => b.likes - a.likes)));
  };
};

export const loginUser = (username, password) => {
    return async (dispatch) => {
      let cred = null
      try {
        cred = await getLogin(username, password);
      }
      catch (exception) {
        cred = null
      }
        
        if (cred===null) {
            dispatch(setNotification({ msg: "Wrong credentials", type: "error" }))
        }
        else {
            dispatch(setUser(cred))
            window.localStorage.setItem("userData", JSON.stringify(cred));
            dispatch(setNotification({ msg: "Logged In Successfully", type: "ok" }));
        }
    }
}

export const setter = (item) => {
  return async dispatch => {
    dispatch(setUser(item))
  }
}

export const setUsers = (arr) => {
  return async dispatch => {
    dispatch(setUsersRed(arr))
  }
}

export default store;
