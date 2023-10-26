import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faArrowDown, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useDeleteCommentMutation, useVoteCommentMutation} from "../redux/api/comments";
import {useSelector} from "react-redux";

function Comment(props) {

    const [deleteComment] = useDeleteCommentMutation();
    const [voteComment] = useVoteCommentMutation();
    const me = useSelector(state => state.auth.credentials.user);

    const onDelete = async () => {
        await deleteComment(props.data.id).then(() => {
            console.log("deleted")
        }).catch(() => {
            console.log("error")
        })
    }

    const upVotes = props.data.vote.filter(i => i.type === "up");
    const downVotes = props.data.vote.filter(i => i.type === "down");

    const ifUp=props.data.author.id===me.userId&& props.data.vote.find(i=>i.userId===me.userId&&i.type==="up");
    const ifDown=props.data.author.id===me.userId&& props.data.vote.find(i=>i.userId===me.userId&&i.type==="down");

    const onSubmit = async (type) => {
        await voteComment({
            commentId: Number(props.commentId),
            userId: Number(me.userId),
            type: type
        }).then(() => {
            console.log("added");
        }).catch(() => {
            console.log("error")
        })
    }

    return (
        <div key={props.data.id} className="comment">
            <h3>{props.data.author.username}</h3>
            <p>{props.data.text}</p>
            {props.edit && <FontAwesomeIcon className={"delete"} icon={faTrash} onClick={onDelete}/>}
            <div className="votes">
                {me.userId ?
                    <>
                        <div className="vote log" onClick={() => onSubmit("up")} style={{backgroundColor:ifUp?"gold":"inherit", color: ifUp?"black":"inherit"}}>
                            <FontAwesomeIcon icon={faArrowUp} />
                            <h4>{upVotes.length}</h4>
                        </div>

                        <div className="vote log" onClick={() => onSubmit("down")} style={{backgroundColor:ifDown?"gold":"inherit", color: ifDown?"black":"inherit"}}>
                            <FontAwesomeIcon icon={faArrowDown}/>
                            <h4>{downVotes.length}</h4>
                        </div>
                    </>
                    :
                    <>
                        <div className="vote">
                            <FontAwesomeIcon icon={faArrowUp}/>
                            <h4>{upVotes.length}</h4>
                        </div>

                        <div className="vote">
                            <FontAwesomeIcon icon={faArrowDown}/>
                            <h4>{downVotes.length}</h4>
                        </div>
                    </>
                }

            </div>
        </div>
    )
}

export default Comment;