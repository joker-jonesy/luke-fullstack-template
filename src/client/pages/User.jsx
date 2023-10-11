import {useSelector} from "react-redux";
import {useDeletePostMutation, useAddPostMutation, useGetPostsQuery} from "../reducers/api";
import {useGetUserPostsQuery} from "../reducers/api";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function User (){
    const me = useSelector(state=>state.auth.credentials.user);
    const [deletePost] = useDeletePostMutation();
    const [addPost]= useAddPostMutation();
    const postsData = useGetPostsQuery();
    const posts = useSelector(state=>state.data.posts)

    const [load, setLoad] = useState(true)

    useEffect(() => {
        setLoad(postsData.isLoading)
    }, [postsData])

    const navigate = useNavigate()

    useEffect(()=>{
        !me.userId && navigate("/")
    }, [me])

    const onDelete = async (id)=>{
        await deletePost(id).then(()=>{
            console.log("delete");
            // location.reload()
        }).catch(()=>{
            console.log("error")
        })
    }

    const onSubmit = async()=>{
        await addPost({
            text:"the coolest post ever",
            authorId: me.userId
        }).then(()=>{
            console.log("added");
        }).catch(()=>{
            console.log("error")
        })
    }



    return (
        <>
            <button onClick={onSubmit}>Add Post</button>
            {load? <h1>Loading...</h1>: posts.filter(i=>  i.authorId === me.userId).length===0? <h1>User has not created any posts</h1>:posts.filter(i=>  i.authorId === me.userId).map((i)=>
                <div key={i.id}>
                    <h1 >{i.text}</h1>
                    <button onClick={()=>onDelete(i.id)}>DELETE</button>
                </div>
            )}
        </>
    )
}

export default User;