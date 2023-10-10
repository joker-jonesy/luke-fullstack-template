import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const CREDENTIALS = "credentials";

// Define a service using a base URL and expected endpoints
export const api = createApi({
    tagTypes:['tag'],
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "localhost:3000",
        prepareHeaders: (headers, { getState }) => {
            console.log("prepareHeaders is running");

            const credentials = window.sessionStorage.getItem(CREDENTIALS);
            const parsedCredentials = JSON.parse(credentials || "{}");
            const token = parsedCredentials.token;
            console.log("token from reducer", token);
            if (token) {
                headers.set("Authorization", token);
            }
            console.log("token from session storage:", token);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: ()=> 'api/posts'
        }),
        getUserPosts: builder.query({
            query:()=>'api/posts/user/'
        }),
        deletePost:builder.mutation({
            query:(id)=>({
                url:'api/posts/'+id,
                method:'DELETE'
            })
        }),
        addPost: builder.mutation({
            query:(body)=>({
                url:'api/posts',
                method:"POST",
                body:body
            })
        }),
        editPost: builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: 'api/posts/'+id,
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
        posts:[]
    },
    reducers:{},
    extraReducers: (builder)=>{
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

export const {useGetUserPostsQuery, useAddPostMutation, useDeletePostMutation, useGetPostsQuery, useUpdatePostMutation} = api;