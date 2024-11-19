import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  token: (() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken === "undefined") {
      localStorage.removeItem("token")
      return false
    }
    return storedToken ? JSON.parse(storedToken) : false
  })(),
  userId: localStorage.getItem("userId") || null,
  profileImg: localStorage.getItem("profileImg") || "/assets/defaultProfileImg.png",
};

const authStore = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = true
      localStorage.setItem("token", JSON.stringify(true))

      const {userId} = action.payload
      state.userId = userId
      localStorage.setItem("userId", userId)

      const {profileImg} = action.payload
      console.log(action.payload)
      state.profileImg = profileImg || "/assets/defaultProfileImg.png"
      localStorage.setItem("profileImg", state.profileImg)
    },
    logout: (state) => {
      state.token = false
      localStorage.removeItem("token")

      state.userId = null;
      localStorage.removeItem("userId")

      state.profileImg = "/assets/defaultProfileImg.png";
      localStorage.removeItem("profileImg")
    },
  },
});

export const { login, logout } = authStore.actions
export default authStore.reducer
