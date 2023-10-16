import {useDeletePostMutation, useEditPostMutation} from "../reducers/api";
import Button from "./inputs/Button";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faWrench, faTrash} from "@fortawesome/free-solid-svg-icons";
import Tags from "./Tags";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import TextInput from "./inputs/TextInput";

function Post(props) {

    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(props.data.text)
    const [deletePost] = useDeletePostMutation();
    const [editPost] = useEditPostMutation();
    const onDelete = async (e) => {
        e.preventDefault();
        await deletePost(props.data.id).then(() => {
        }).catch(() => {
            console.log("error")
        })
    }

    const onUpdate = async () => {
        await editPost(
            {
                id: props.data.id,
                text: text,
                authorId: props.data.authorId,
                tags: props.data.tags
            }
        ).then(() => {
            console.log("modified")
        }).catch(() => {
            console.log("error")
        })
    }

    useEffect(() => {
        onUpdate();

    }, [edit])

    return (
        <>
            {
                !edit ?

                    <Link to={"/post/" + props.data.id} className={"post"}>

                        <div className={"info"}>
                            <h1>{props.data.author.username}</h1>
                             <p>{props.data.text}</p>
                            {props.delete &&
                                <FontAwesomeIcon className={"delete"} icon={faTrash} size="2x" onClick={onDelete}/>}
                            {props.delete &&
                                <FontAwesomeIcon className={"edit"} icon={faWrench} size="2x" onClick={(event) => {
                                    event.preventDefault();
                                    setEdit(!edit)
                                }}/>}
                        </div>
                        <Tags data={props.data.post_tag}/>
                    </Link>

                    :

                    <div className={"post"}>

                        <div className={"info"}>
                            <h1>{props.data.author.username}</h1>
                            <TextInput type={"text"} chg={setText} vl={text}/>
                            {props.delete &&
                                <FontAwesomeIcon className={"delete"} icon={faTrash} size="2x" onClick={onDelete}/>}
                            {props.delete &&
                                <FontAwesomeIcon className={"edit"} icon={faWrench} size="2x" onClick={(event) => {
                                    event.preventDefault();
                                    setEdit(!edit)
                                }}/>}
                        </div>
                        <Tags data={props.data.post_tag}/>

                    </div>


            }

        </>

    )
}

export default Post;