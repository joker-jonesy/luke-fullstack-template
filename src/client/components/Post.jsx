import {useDeletePostMutation, useGetPostAuthorQuery, useGetPostsQuery} from "../reducers/api";
import Button from "./inputs/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner, faTrash} from "@fortawesome/free-solid-svg-icons";
import Tags from "./Tags";

function Post(props) {

    const [deletePost] = useDeletePostMutation();
    const {data, isLoading} = useGetPostAuthorQuery(props.data.id)
    const onDelete = async (id) => {
        await deletePost(id).then(() => {
        }).catch(() => {
            console.log("error")
        })
    }

    return (
        <div className={"post"}>
            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin/> : <>
                <div className={"info"}>
                <h1>{data.username}</h1>
                <p>{props.data.text}</p>
                {props.delete && <FontAwesomeIcon className={"delete"} icon={faTrash} size="2x" onClick={()=>onDelete(props.data.id)}/>}</div>
                <Tags data={props.data.post_tag}/>
            </>}
        </div>
    )
}

export default Post;