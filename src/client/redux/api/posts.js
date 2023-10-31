import {api} from "./api";
const postApi = api.injectEndpoints({
    endpoints: (builder)=>({
        getPosts: builder.query({
            query: ()=> '/api/posts',
        }),
        getPost: builder.query({
            query: (id)=> '/api/posts/'+id
        }),
        getPagePost: builder.query({
            query: (num)=> '/api/posts/page/'+num
        }),
        searchPost: builder.query({
            query: (search)=>'/api/search/'+search
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
        likePost : builder.mutation({
            query:(body)=>({
                url:'/api/likes',
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
    })
})

export const {
    useGetPagePostQuery,
    useLikePostMutation,
    useAddPostMutation,
    useGetPostQuery,
    useDeletePostMutation,
    useGetPostsQuery,
    useEditPostMutation} = postApi;