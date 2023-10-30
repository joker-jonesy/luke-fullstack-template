import Button from "../inputs/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp, faThumbsDown} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {useLikePostMutation} from "../../redux/api/posts";
import {notify} from "../../redux/slices/notificationSlice";


function Like(props) {

    const [likePost, {isLoading}] = useLikePostMutation();
    const likes = props.data.filter(i => i.type === props.type).length;
    const me = useSelector(state => state.auth.credentials.user);
    const dispatch = useDispatch()
    const notLength = useSelector(state=>state.notifications.length)

    const onSubmit = async () => {
        await likePost({
            postId: Number(props.postId),
            type: props.type
        }).then(() => {
            console.log("added");
        }).catch(() => {
            dispatch(notify({
                id: notLength,
                type:"fail",
                text:"Error posting",
                active:true
            }))
        })
    }

    return (
        <div className={"slot"}>
            {me.userId ? <Button
                theme={ isLoading ? "loadingBorder" : props.data.find(i => i.userId === me.userId && i.type === props.type) ? "chose" : ""}
                click={() => onSubmit(props.type)} vl={<><FontAwesomeIcon
                icon={props.type === "like" ? faThumbsUp : faThumbsDown}/><span>{likes}</span></>}/> : <div>
                <FontAwesomeIcon icon={props.type === "like" ? faThumbsUp : faThumbsDown}/><span>{likes}</span></div>}
        </div>
    )

}

export default Like