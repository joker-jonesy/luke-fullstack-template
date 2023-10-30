import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faArrowDown, faTrash, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useDeleteCommentMutation, useVoteCommentMutation} from "../../redux/api/comments";
import {useDispatch, useSelector} from "react-redux";
import {notify} from "../../redux/slices/notificationSlice";

function Comment(props) {

    const [deleteComment, {isLoading:deleting}] = useDeleteCommentMutation();
    const [voteComment, {isLoading:voting}] = useVoteCommentMutation();
    const me = useSelector(state => state.auth.credentials.user);
    const dispatch = useDispatch()
    const notLength = useSelector(state=>state.length)

    const onDelete = async () => {
        await deleteComment(props.data.id).then(()=>{
            dispatch(notify({
                id: notLength,
                type:"success",
                text:"Comment Deleted!",
                active:true
            }))
        }).catch(() => {
            dispatch(notify({
                id: notLength,
                type:"fail",
                text:"Error deleting",
                active:true
            }))
        })
    }

    const upVotes = props.data.vote.filter(i => i.type === "up")||[];
    const downVotes = props.data.vote.filter(i => i.type === "down")||[];

    const ifUp=props.data.author.id===me.userId&& props.data.vote.find(i=>i.userId===me.userId&&i.type==="up");
    const ifDown=props.data.author.id===me.userId&& props.data.vote.find(i=>i.userId===me.userId&&i.type==="down");

    const onSubmit = async (type) => {
        await voteComment({
            commentId: Number(props.commentId),
            type: type
        }).then(() => {
            console.log("added");
        }).catch(() => {
            console.log("error")
        })
    }

    const userEdit = props.data.authorId===me.userId||props.post.authorId===me.userId

    return (
        <div key={props.data.id} className="comment">
            {deleting||voting&&<FontAwesomeIcon className={"load"} icon={faSpinner} spin/>}
            <h3>{props.data.author.username}</h3>
            <p>{props.data.text}</p>
            {userEdit && <FontAwesomeIcon className={"delete"} icon={faTrash} onClick={onDelete}/>}
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