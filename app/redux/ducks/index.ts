import { combineReducers } from "redux";
import login from "./login";
import signup from "./signup";
import forgotpassword from "./forgotpassword";
import profile from "./profile";
import home from "./home";
import updateLikes from "./updateLikes";
import global from "./global";

export default combineReducers({
  login,
  signup,
  forgotpassword,
  profile,
  home,
  updateLikes,
  global,
});
