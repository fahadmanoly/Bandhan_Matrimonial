
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/user/' }),
  endpoints: (builder) => ({

    registerUser: builder.mutation({
        query:(user)=>{
            return{
                url:'register/',
                method:'POST',
                body:user,
                headers:{
                    'Content-type': 'application/json',
                }
            }
        }
    }),

    loginUser: builder.mutation({
        query:(user)=>{
            return{
                url:'login/',
                method:'POST',
                body:user,
                headers:{
                    'Content-type': 'application/json',
                }
            }
        }
    }),

    getLoggedUser: builder.query({
        query:(access_token)=>{
            return{
                url:'profile/',
                method:'GET',
                headers:{
                    'authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json',
                }
            }
        }
    }),

    getLoggedUserPicture: builder.query({
        query:(access_token)=>{
            return{
                url:'image/',
                method:'GET',
                headers:{
                    'authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json',
                }
            }
        }
    }),


    searchUsers: builder.query({
        query:(params)=> 
        `search_matches/?age_min=${params.age_min}&age_max=${params.age_max}&religion=${params.religion}&gender=${params.gender}`,     

    }),


    matchDetails: builder.query({
        query:({access_token, match_id})=>{
            return{
                url:`match_details/${match_id}/`,
                method:'GET',
                headers:{
                    'authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json',
                }
            }
        }
    }),

    

    changeUserPassword: builder.mutation({
        query:({ actualData, access_token }) => {
            return{
                url:'changepassword/',
                method:'POST',
                body:actualData,
                headers:{
                    'authorization':`Bearer ${access_token}`,
                    'Content-type': 'application/json',
                }
            }
        }
    }),

    forgotPassword: builder.mutation({
        query:(user)=>{
            return{
                url:'forgotpassword/',
                method:'POST',
                body:user,
                headers:{
                    'Content-type': 'application/json',
                }
            }
        }
    }),

    resetPassword: builder.mutation({
        query:({actualData, id, token})=>{
            return{
                url:`/resetpassword/${id}/${token}/`,
                method:'POST',
                body:actualData,
                headers:{
                    'Content-type': 'application/json',
                }
            }
        }
    }),

    userInfo: builder.mutation({
        query:({actualData, access_token }) => {
            return{
                url:'userinfo/',
                method:'POST',
                body:actualData,
                headers:{
                    'authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json',
                }
            }
        }
    }),


    userPreference: builder.mutation({
        query:({actualData, access_token }) => {
            return{
                url:'userpreference/',
                method:'POST',
                body:actualData,
                headers:{
                    'authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json',
                }
            }
        }
    }),


    SendOTP: builder.mutation({
        query:({user, access_token }) => {
            return{
                url:'sendotp/',
                method:'POST',
                body:user,
                headers:{
                    'authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json',
                }
            }
        }
    }),

    VerifyOTP: builder.mutation({
        query:({actualData, access_token }) => {
            return{
                url:'verifyotp/',
                method:'POST',
                body:actualData,
                headers:{
                    'authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json',
                }
            }
        }
    }),


    ProfilePicture: builder.mutation({
        query:({formData, access_token }) => {
            return{
                url: 'profilepicture/',
                method:'POST',
                body:formData,
                headers:{
                    'authorization':`Bearer ${access_token}`,
                }
            }
           
        } 
    }),
    


    }),
  })

export const { useRegisterUserMutation, useLoginUserMutation, useGetLoggedUserQuery, useChangeUserPasswordMutation, useForgotPasswordMutation, useResetPasswordMutation, useUserInfoMutation, useSendOTPMutation, useVerifyOTPMutation, useUserPreferenceMutation, useProfilePictureMutation, useGetLoggedUserPictureQuery, useSearchUsersQuery, useMatchDetailsQuery} = userAuthApi 




