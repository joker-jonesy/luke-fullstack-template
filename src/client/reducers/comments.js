import { api } from "./api";
const commentApi = api.injectEndpoints({
    endpoints: (builder)=>({
        deleteComment:builder.mutation({
            query:(id)=>({
                url:'/api/comments/'+id,
                method:'DELETE'
            })
        }),
        voteComment : builder.mutation({
            query:(body)=>({
                url:'/api/votes',
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
    })
})

export const {
    useDeleteCommentMutation,
    useVoteCommentMutation,
    useAddCommentMutation
} = commentApi;