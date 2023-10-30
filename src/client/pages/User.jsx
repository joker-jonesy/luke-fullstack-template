import {useSelector} from "react-redux";
import { useGetPostsQuery} from "../redux/api/posts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CreatePostForm from "../components/posts/CreatePostForm";
import Post from "../components/posts/Post";
import Avatar from "../components/inputs/Avatar";
import Button from "../components/inputs/Button";
import {useLogoutMutation} from "../redux/api/auth";
function User (){
    const me = useSelector(state=>state.auth.credentials.user);
    const postsData = useGetPostsQuery();
    const posts = useSelector(state=>state.data.posts)
    const [logout] = useLogoutMutation();

    const [load, setLoad] = useState(true)

    useEffect(() => {
        setLoad(postsData.isLoading)
    }, [postsData])

    const navigate = useNavigate()

    useEffect(()=>{
        !me.userId && navigate("/")
    }, [me])

    return (
        <>
            <section>
                <Avatar mod={true}/>
                <h1>Welcome {me.username}!</h1>
                <Button click={logout} theme={"warning"}>Logout</Button>
            <CreatePostForm me={me}/>
            {load? <h1>Loading...</h1>: posts.filter(i=>  i.authorId === me.userId).length===0? <h1>User has not created any posts</h1>:posts.filter(i=>  i.authorId === me.userId).map((i)=>
                <Post key={i.id} data={i} delete={true}/>
            )}
            </section>
        </>
    )
}

export default User;