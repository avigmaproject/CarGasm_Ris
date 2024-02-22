import { combineReducers } from "redux";
import login from "./login";
import signup from "./signup";
import forgotpassword from "./forgotpassword";

export default combineReducers({ login, signup, forgotpassword });
