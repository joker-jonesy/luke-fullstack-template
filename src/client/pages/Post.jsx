import {useParams} from "react-router-dom";
import {useGetPostQuery} from "../reducers/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faTrash} from "@fortawesome/free-solid-svg-icons";
import Tags from "../components/Tags";
import Likes from "../components/Likes";


function Post (){

    const params = useParams();
    const {data, isLoading}= useGetPostQuery(params.id)

    return(
        <section className={"center"}>
            {isLoading? <FontAwesomeIcon icon={faSpinner} spin/>: !data ? <h1>Post Not Found</h1>:

                <div className={"post"}>
                        <div className={"info"}>
                            <h1>{data.author.username}</h1>
                            <p>{data.text}</p>
                            <Likes data={data.like} postId={data.id}/>
                        <Tags data={data.post_tag}/>
                        </div>
                </div>

            }
        </section>
    )
}

export default Post;