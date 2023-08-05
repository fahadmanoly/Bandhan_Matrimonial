
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email:"",
  name:"",
  id:"",
  is_phone_verified:"",
  is_preferences:"",
  about_me :"", 
  Education :"", 
  country :"", 
  date_of_birth :"",
  family_status :"",
  family_values :"",
  gender :"", 
  height :"", 
  location :"", 
  marital_status:"",
  mobile :"", 
  mother_tongue :"",
  native_place :"",
  profession :"",
  religion :"", 
  weight :"",
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
        state.about_me = action.payload.about_me
        state.Education = action.payload.Education
        state.country = action.payload.country
        state.date_of_birth = action.payload.date_of_birth
        state.family_status = action.payload.family_status
        state.family_values = action.payload.family_values
        state.gender = action.payload.gender
        state.height = action.payload.height
        state.location = action.payload.location
        state.marital_status = action.payload.marital_status 
        state.mobile = action.payload.mobile
        state.mother_tongue = action.payload.mother_tongue
        state.native_place = action.payload.native_place
        state.profession = action.payload.profession
        state.religion = action.payload.religion
        state.weight = action.payload.weight
    },
    unsetUserInfo:(state,action) => {
        state.email = action.payload.email
        state.name = action.payload.name
        state.id = action.payload.id
        state.is_preferences = action.payload.is_preferences
        state.is_phone_verified = action.payload.is_phone_verified
        state.about_me = action.payload.about_me
        state.Education = action.payload.Education
        state.country = action.payload.country
        state.date_of_birth = action.payload.date_of_birth
        state.family_status = action.payload.family_status
        state.family_values = action.payload.family_values
        state.gender = action.payload.gender
        state.height = action.payload.height
        state.location = action.payload.location
        state.marital_status = action.payload.marital_status 
        state.mobile = action.payload.mobile
        state.mother_tongue = action.payload.mother_tongue
        state.native_place = action.payload.native_place
        state.profession = action.payload.profession
        state.religion = action.payload.religion
        state.weight = action.payload.weight
    },
    
  },
})

export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default userSlice.reducer
