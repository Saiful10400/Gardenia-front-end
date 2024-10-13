import { getToken } from "@/utils/getToken";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACK_END_URL,
    prepareHeaders: (header) => {
      if (getToken()) header.set("Authorization", getToken() as string);
    },
  }),
  tagTypes: ["aUserData", "aUserFollowing", "post", "totalVote", "allUser"],
  endpoints: (builder) => {
    return {
      signup: builder.mutation({
        query: (payload) => {
          console.log(payload);
          return {
            url: "/auth/signup",
            method: "POST",
            body: payload,
          };
        },
      }),
      login: builder.mutation({
        query: (payload) => {
          console.log(payload);
          return {
            url: "/auth/login",
            method: "POST",
            body: payload,
          };
        },
      }),

      checkCredentials: builder.mutation({
        query: (payload) => {
          return {
            url: "/auth/checkCredentials",
            method: "POST",
            body: payload,
          };
        },
      }),

      lastPassVal: builder.mutation({
        query: (payload) => {
          return {
            url: "/auth/lastPassVal",
            method: "POST",
            body: payload,
          };
        },
      }),


      changePassword: builder.mutation({
        query: (payload) => {
          return {
            url: "/auth/changePassword",
            method: "POST",
            body: payload,
          };
        },
      }),

      UpdateAUser: builder.mutation({
        query: (payload) => {
          const { id, ...rest } = payload;
          return {
            url: `/auth/${id}`,
            method: "PUT",
            body: rest,
          };
        },
        invalidatesTags: ["aUserData", "allUser"],
      }),

      getLoggedInUser: builder.query({
        query: () => {
          return {
            url: `/auth/getCurrentUser`,
            method: "GET",
          };
        },
        providesTags: ["aUserData"],
      }),

      getAllUser: builder.query({
        query: () => {
          return {
            url: `/auth/all-user`,
            method: "GET",
          };
        },
        providesTags: ["allUser"],
      }),

      getAUser: builder.query({
        query: (payload) => {
          console.log(payload, "user payload");
          return {
            url: `/auth/${payload}`,
            method: "GET",
          };
        },
        providesTags: ["aUserData"],
      }),

      getFollowerAndFollowing: builder.query({
        query: (payload) => {
          if(!payload)return ""
          return {
            url: `/follow/${payload}`,
            method: "GET",
          };
        },
        providesTags: ["aUserFollowing"],
      }),

      createFollowing: builder.mutation({
        query: (payload) => {
          return {
            url: "/follow",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["aUserFollowing", "aUserData"],
      }),

      unfollowOne: builder.mutation({
        query: (payload) => {
          return {
            url: `/follow`,
            method: "DELETE",
            body:payload
          };
        },
        invalidatesTags: ["aUserFollowing", "aUserData"],
      }),

      getPost: builder.query({
        query: () => {
          return {
            url: `/post`,
            method: "GET",
          };
        },
        providesTags: ["post"],
      }),

      createPost: builder.mutation({
        query: (payload) => {
          return {
            url: `/post`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["post"],
      }),

      updatePost: builder.mutation({
        query: (payload) => {
          const { id, ...rest } = payload;
          return {
            url: `/post/${id}`,
            method: "PUT",
            body: rest,
          };
        },
        invalidatesTags: ["post"],
      }),

      deletePost: builder.mutation({
        query: (payload) => {
          return {
            url: `/post/${payload}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["post"],
      }),
      blockAPost: builder.mutation({
        query: (payload) => {
          return {
            url: `/post/block/${payload}`,
            method: "PUT",
          };
        },
        invalidatesTags: ["post"],
      }),

      getApost: builder.query({
        query: (payload) => {
          return {
            url: `/post/post/${payload}`,
            method: "GET",
          };
        },
        providesTags: ["post"],
      }),

      getAuserAllPost: builder.query({
        query: (payload) => {
          if (!payload) return "";
          return {
            url: `/post/user/${payload}`,
            method: "GET",
          };
        },
        providesTags: ["post"],
      }),

      allPostImage: builder.query({
        query: () => {
          
          return {
            url: `/post/image`,
            method: "GET",
          };
        },
        providesTags: ["post"],
      }),

      getTotalVote: builder.query({
        query: (payload) => {
          if (!payload) return "";
          return {
            url: `/post/totalvote/${payload}`,
            method: "GET",
          };
        },
        providesTags: ["totalVote"],
      }),

      Reaction: builder.mutation({
        query: (payload) => {
          return {
            url: `/reaction`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["post", "totalVote"],
      }),

      createComment: builder.mutation({
        query: (payload) => {
          return {
            url: `/comment`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["post"],
      }),

      deleteComment: builder.mutation({
        query: (payload) => {
          return {
            url: `/comment/${payload}`,
            method: "DELETE",
            
          };
        },
        invalidatesTags: ["post"],
      }),

      updateComment: builder.mutation({
        query: (payload) => {
          const{id,...rest}=payload
          return {
            url: `/comment/${id}`,
            method: "PUT",
            body:rest
            
          };
        },
        invalidatesTags: ["post"],
      }),

      toggleFavourite: builder.mutation({
        query: (payload) => {
          
          return {
            url: `/favourite`,
            method: "POST",
            body:payload
            
          };
        },
        invalidatesTags: ["post"],
      }),

      allPaymentHistory: builder.query({
        query: () => {
          return {
            url: `/payment-history`,
            method: "GET",
          };
        },
      }),

      getPaymentUrl: builder.query({
        query: (payload) => {
          return {
            url: `/pay/${payload}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useAllPostImageQuery,
  useToggleFavouriteMutation,
  useUpdateCommentMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetAllUserQuery,
  useAllPaymentHistoryQuery,
  useBlockAPostMutation,
  useGetTotalVoteQuery,
  useReactionMutation,
  useGetAuserAllPostQuery,
  useGetApostQuery,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useCreatePostMutation,
  useLoginMutation,
  useSignupMutation,
  useGetLoggedInUserQuery,
  useGetPaymentUrlQuery,
  useChangePasswordMutation,
  useCheckCredentialsMutation,
  useGetAUserQuery,
  useUpdateAUserMutation,
  useGetFollowerAndFollowingQuery,
  useCreateFollowingMutation,
  useUnfollowOneMutation,
  useLastPassValMutation
} = baseApi;
