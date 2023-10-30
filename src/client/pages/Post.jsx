import {useParams} from "react-router-dom";
import {useGetPostQuery} from "../redux/api/posts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import Tags from "../components/tags/Tags";
import Likes from "../components/likes/Likes";
import Comments from "../components/comments/Comments";
import CreateCommentForm from "../components/comments/CreateCommentForm";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";


function Post() {

    const me = useSelector(state => state.auth.credentials.user);

    const params = useParams();
    const {isLoading} = useGetPostQuery(params.id);
    const post = useSelector(state=>state.data.post);
    const [load, setLoad] = useState(true)
    useEffect(() => {
        setLoad(isLoading)
    }, [isLoading])



    return (
        <section className={"center"}>
            {load ? <FontAwesomeIcon icon={faSpinner} spin/> : !post ? <h1>Post Not Found</h1> : <>

                <div className={"post"}>
                    <div className={"info"}>
                        <h1>{post.author.username}</h1>
                        <p>{post.text}</p>
                        <Likes data={post.like} postId={post.id}/>
                    </div>
                    {post.comment!==0&&<Comments data={post.comment} post={post} postId={post.id} edit={me.userId===post.authorId}/> }
                    {post.post_tag.length!==0&&<Tags data={post.post_tag}/>}
                </div>
                {me.userId&&
                    <CreateCommentForm postId={post.id}/>
                }
            </>


            }
        </section>
    )
}

export default Post;