import { combineReducers } from "redux";
import login from "./login";
import signup from "./signup";
import forgotpassword from "./forgotpassword";
import profile from "./profile";
import home from "./home";
import updateLikes from "./updateLikes";
import global from "./global";
import getCategories from "./getCategories";
import getSubCategories from "./getSubCategories";
import getPostedItems from "./getPostedItems";
import createPost from "./createPost";

export default combineReducers({
  login,
  signup,
  forgotpassword,
  profile,
  home,
  updateLikes,
  global,
  getCategories,
  getSubCategories,
  getPostedItems,
  createPost,
});
