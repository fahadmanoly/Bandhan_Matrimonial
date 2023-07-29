
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email:"",
  name:"",
  id:"",
}

export const userSlice = createSlice({
  name: 'user_infor',
  initialState,
  reducers: {
    setUserInfo:(state,action) => {
        state.email = action.payload.email
        state.name = action.payload.name
        state.id = action.payload.id
    },
    unsetUserInfo:(state,action) => {
        state.email = action.payload.email
        state.name = action.payload.name
        state.id = action.payload.id
    },
    
  },
})

export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default userSlice.reducer
