import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const friendAuthApi = createApi({
  reducerPath: 'friendAuthApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/connect/' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.manoly.life/api/connect/' }),
  endpoints: (builder) => ({

    sendRequest: builder.mutation({
        query:({receiver_id, access_token})=>{
            return{
                url:`send-request/${receiver_id}/`,
                method:'POST',
                headers:{
                    'authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json',
                }
            }
        }
    }),

    cancelRequest: builder.mutation({
        query:({friend_request_id, access_token})=>{
            return{
                url:`cancel-request/${friend_request_id}/`,
                method:'POST',
                headers:{
                    'authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json',
                }
            }
        }
    }),

    acceptRequest: builder.mutation({
        query:({friend_request_id, access_token})=>{
            return{
                url:`accept-request/${friend_request_id}/`,
                method:'POST',
                headers:{
                    'authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json',
                }
            }
        }
    }),


    declineRequest: builder.mutation({
        query:({friend_request_id, access_token})=>{
            return{
                url:`decline-request/${friend_request_id}/`,
                method:'POST',
                headers:{
                    'authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json',
                }
            }
        }
    }),



}),
})


export const { useSendRequestMutation, useCancelRequestMutation, useAcceptRequestMutation, useDeclineRequestMutation } = friendAuthApi