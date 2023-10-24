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
            query: ()=> '/api/posts',
        }),
        getPost: builder.query({
            query: (id)=> '/api/posts/'+id
        }),
        searchPost: builder.mutation({
            query:(body)=>({
                url:'/api/search',
                method:"POST",
                body:body
            })
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
        deleteComment:builder.mutation({
            query:(id)=>({
                url:'/api/comments/'+id,
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
        likePost : builder.mutation({
            query:(body)=>({
                url:'/api/likes',
                method:"POST",
                body:body
            })
        }),
        addComment : builder.mutation({
            query:(body)=>({
                url:'/api/comments',
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
        tags:[],
        post:null,
        results: {
            search:false,
            rslt:[]
        }
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder.addMatcher(api.endpoints.getTags.matchFulfilled, (state, {payload})=>{
            return{
                ...state,
                tags: payload
            }
        })

        builder.addMatcher(api.endpoints.getPost.matchFulfilled, (state, {payload})=>{
            return{
                ...state,
                post: payload
            }
        })

        builder.addMatcher(api.endpoints.getPosts.matchFulfilled, (state, {payload})=>{
            return{
                ...state,
                posts: payload
            }
        })

        builder.addMatcher(api.endpoints.searchPost.matchFulfilled, (state, {payload})=>{
            return{
                ...state,
                results: {
                    search:true,
                    rslt:payload
                }
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

        builder.addMatcher(api.endpoints.likePost.matchFulfilled, (state, {payload})=>{
            return {
                ...state,
                posts: state.posts.map(i=>i.id===payload.id?{...i, ...payload}:i)
            }
        })

        builder.addMatcher(api.endpoints.editPost.matchFulfilled, (state, {payload})=>{
            return {
                ...state,
                posts: state.posts.map(i=>i.id===payload.id?{...i, ...payload}:i)
            }
        })

        builder.addMatcher(api.endpoints.addComment.matchFulfilled, (state, {payload})=>{
            return{
                ...state,
                post: payload.post,
                posts: payload.allPosts
            }
        })

        builder.addMatcher(api.endpoints.deleteComment.matchFulfilled, (state, {payload})=>{
            return{
                ...state,
                post: payload.post,
                posts: payload.allPosts
            }
        })


    }
})

export default dataSlice.reducer;

export const {useSearchPostMutation, useDeleteCommentMutation, useAddCommentMutation, useLikePostMutation, useGetUserPostsQuery, useAddPostMutation, useGetPostQuery, useDeletePostMutation, useGetPostsQuery, useGetTagsQuery, useEditPostMutation} = api;