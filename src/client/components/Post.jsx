import {useDeletePostMutation, useGetPostAuthorQuery, useGetPostsQuery} from "../reducers/api";
import Button from "./inputs/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

function Post(props) {

    const [deletePost] = useDeletePostMutation();
    const {data, isLoading} = useGetPostAuthorQuery(props.data.id)
    const onDelete = async (id) => {
        await deletePost(id).then(() => {
            console.log("delete");
        }).catch(() => {
            console.log("error")
        })
    }

    return (
        <div className={"post"}>
            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin/> : <>
                <h1>{data.username}</h1>
                <p>{props.data.text}</p>
                {props.delete && <Button click={() => onDelete(props.data.id)} theme={"primary"} vl={"DELETE"}/>}</>}
        </div>
    )
}

export default Post;