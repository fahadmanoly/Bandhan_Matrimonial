
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email:"",
  name:"",
  id:"",
  is_phone_verified:"",
  is_preferences:""
}

export const userSlice = createSlice({
  name: 'user_infor',
  initialState,
  reducers: {
    setUserInfo:(state,action) => {
        state.email = action.payload.email
        state.name = action.payload.name
        state.id = action.payload.id
        state.is_preferences = action.payload.is_preferences
        state.is_phone_verified = action.payload.is_phone_verified
    },
    unsetUserInfo:(state,action) => {
        state.email = action.payload.email
        state.name = action.payload.name
        state.id = action.payload.id
        state.is_preferences = action.payload.is_preferences
        state.is_phone_verified = action.payload.is_phone_verified
    },
    
  },
})

export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default userSlice.reducer
