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

        getTags: builder.query({
            query: ()=> '/api/tags'
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
    reducers:{
        clearSearch: (state)=>{
            return{
                ...state,
                results: {
                    search:false,
                    rslt:[]
                }
            }
        }
    },
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

        builder.addMatcher(api.endpoints.voteComment.matchFulfilled, (state, {payload})=>{
            return {
                ...state,
                posts: state.posts.map(i=>i.id===payload.id?{...i, ...payload}:i)
            }
        })


    }
})

export default dataSlice.reducer;
export const {clearSearch} = dataSlice.actions;

export const {useGetTagsQuery} = api;