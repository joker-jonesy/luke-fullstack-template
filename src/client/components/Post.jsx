import {useDeletePostMutation, useEditPostMutation, useGetTagsQuery} from "../reducers/api";
import Button from "./inputs/Button";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faWrench, faTrash, faSpinner} from "@fortawesome/free-solid-svg-icons";
import Tags from "./Tags";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import TextInput from "./inputs/TextInput";
import Likes from "./Likes";
import Comments from "./Comments";

function Post(props) {

    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(props.data.text)
    const [deletePost] = useDeletePostMutation();
    const [editPost] = useEditPostMutation();
    const {data, isLoading} = useGetTagsQuery();
    const [tags, setTags] = useState([]);
    const [change, setChange] = useState(false)
    const onDelete = async (e) => {
        e.preventDefault();
        await deletePost(props.data.id).then(() => {
        }).catch(() => {
            console.log("error")
        })
    }

    const toggleTag = (tag) => {
        const newTags = tags;
        if (tags.find((i) => i.name === tag.name)) {
            const index = tags.indexOf(tag);
            newTags.splice(index, 1);
            setTags(newTags)
        } else {
            newTags.push(tag);
            setTags(newTags)
        }
        setChange(!change)
    }

    const onUpdate = async () => {
        await editPost(
            {
                id: props.data.id,
                text: text,
                authorId: props.data.authorId,
                tags: tags
            }
        ).then(() => {
            console.log("modified")
        }).catch(() => {
            console.log("error")
        })
    }

    useEffect(() => {

        setTags(props.data.post_tag.map((i) => {
            return i.tag
        }))

    }, [edit])

    useEffect(() => {
    }, [change])

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
                            <Likes data={props.data.like} postId={props.data.id}/>

                        </div>
                        {props.data.post_tag.length!==0&&<Tags data={props.data.post_tag}/>}
                        {props.data.comment.length!==0&&<Comments data={props.data.comment} postId={props.data.id}/>}
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
                                    onUpdate();
                                    setEdit(!edit)
                                }}/>}
                        </div>
                        <div className={"tags"}>
                            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin/> : data.map((i) =>
                                <div key={i.id} className={"tag"} onClick={() => toggleTag({name: i.name, id: i.id})}
                                     style={{border: tags.find(x => i.name === x.name) ? "3px solid blue" : "none"}}>{i.name}</div>
                            )}
                        </div>

                    </div>


            }

        </>

    )
}

export default Post;