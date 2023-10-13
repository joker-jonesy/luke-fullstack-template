import {useParams} from "react-router-dom";
import {useGetPostAuthorQuery, useGetPostQuery} from "../reducers/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faTrash} from "@fortawesome/free-solid-svg-icons";
import Tags from "../components/Tags";


function Post (){

    const params = useParams();
    const {data, isLoading}= useGetPostQuery(params.id)
    const author = useGetPostAuthorQuery(isLoading? "":data.id)

    return(
        <section className={"center"}>
            {isLoading||author.isLoading? <FontAwesomeIcon icon={faSpinner} spin/>: !data ? <h1>Post Not Found</h1>:


                <div className={"post"}>
                        <div className={"info"}>
                            <h1>{author.data.username}</h1>
                            <p>{data.text}</p>
                        <Tags data={data.post_tag}/>
                        </div>
                </div>

            }
        </section>
    )
}

export default Post;