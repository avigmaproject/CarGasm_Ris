import { combineReducers } from "redux";
import login from "./login";
import signup from "./signup";
import forgotpassword from "./forgotpassword";
import profile from "./profile";
import home from "./home";

export default combineReducers({
  login,
  signup,
  forgotpassword,
  profile,
  home,
});
