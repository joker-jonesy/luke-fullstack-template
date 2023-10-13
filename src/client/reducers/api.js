import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {createSlice} from "@reduxjs/toolkit";


const CREDENTIALS = "credentials";

// Define a service using a base URL and expected endpoints
export const api = createApi({
    tagTypes:['tag'],
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_URL||"http://localhost:3000",
        prepareHeaders: (headers, { getState }) => {
            const credentials = window.sessionStorage.getItem(CREDENTIALS);
            const parsedCredentials = JSON.parse(credentials || "{}");
            const token = parsedCredentials.token;
            if (token) {
                headers.set("Authorization", token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: ()=> '/api/posts'
        }),
        getPost: builder.query({
            query: (id)=> '/api/posts/'+id
        }),
        getTags: builder.query({
            query: ()=> '/api/tags'
        }),
        deletePost:builder.mutation({
            query:(id)=>({
                url:'/api/posts/'+id,
                method:'DELETE'
            })
        }),
        addPost: builder.mutation({
            query:(body)=>({
                url:'/api/posts',
                method:"POST",
                body:body
            })
        }),
        editPost: builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: '/api/posts/'+id,
                    method:"PUT",
                    body
                }
            }
        }),

    }),
});

const dataSlice = createSlice({
    name:"data",
    initialState:{
        posts:[],
        tags:[]
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder.addMatcher(api.endpoints.getTags.matchFulfilled, (state, {payload})=>{
            return{
                ...state,
                tags: payload
            }
        })

        builder.addMatcher(api.endpoints.getPosts.matchFulfilled, (state, {payload})=>{
            return{
                ...state,
                posts: payload
            }
        })

        builder.addMatcher(api.endpoints.deletePost.matchFulfilled, (state, {payload})=>{
            return {
                ...state,
                posts: state.posts.filter(i=>i.id!==payload.id)
            }

        })

        builder.addMatcher(api.endpoints.addPost.matchFulfilled, (state, {payload})=>{
            state.posts.push(payload);
            return state;
        })
    }
})

export default dataSlice.reducer;

export const {useGetUserPostsQuery, useAddPostMutation, useGetPostQuery, useDeletePostMutation, useGetPostsQuery, useGetTagsQuery} = api;