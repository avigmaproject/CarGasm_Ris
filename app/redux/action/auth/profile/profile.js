export const UserProfile = (userprofile) => {
  return (dispatch) => {
    dispatch({ type: "USER_PROFILE", userprofile })
  }
}
export const UserProfileVideo = (userprofilevideo) => {
  return (dispatch) => {
    dispatch({ type: "USER_PROFILE_VIDEO", userprofilevideo })
  }
}
export const UpdateVideoData = (updatevideodata) => {
  console.log("action==>",updatevideodata)
  return (dispatch) => {
    dispatch({ type: "UPDATE_VIDEO_DATA", updatevideodata })
  }
}


