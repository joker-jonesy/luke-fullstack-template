import Button from "./inputs/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp, faThumbsDown} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {useLikePostMutation} from "../reducers/api";

function Likes ({data, postId}){
    const me = useSelector(state=>state.auth.credentials.user);
    const likes = data.filter(i=>i.type==="like").length;
    const dislikes = data.filter(i=>i.type==="dislike").length;
    const [likePost] = useLikePostMutation();

    const onSubmit = async(type)=>{
        await likePost({
            postId:Number(postId),
            userId: Number(me.userId),
            type: type
        }).then(()=>{
            console.log("added");
        }).catch(()=>{
            console.log("error")
        })
    }

    return(
        <div className="likes">
            <div className={"slot"}>
                {me.userId?<Button theme={data.find(i=>i.userId===me.userId&&i.type==="like")&&"chose"} click={()=>onSubmit("like")} vl={<><FontAwesomeIcon icon={faThumbsUp}/><span>{likes}</span></>}/>:<div style={{border:data.find(i=>i.userId===me.userId&&i.type==="like"?"solid 2px gold":"none")}}><FontAwesomeIcon icon={faThumbsUp}/><span>{likes}</span></div>}
            </div>
            <div className={"slot"}>
                {me.userId?<Button theme={data.find(i=>i.userId===me.userId&&i.type==="dislike")&&"chose"} click={()=>onSubmit("dislike")} vl={<><FontAwesomeIcon icon={faThumbsDown}/><span>{dislikes}</span></>}/>:<div  style={{border:data.find(i=>i.userId===me.userId&&i.type==="dislike"?"solid 2px gold":"none")}}><FontAwesomeIcon icon={faThumbsDown}/><span>{dislikes}</span></div>}
            </div>
        </div>
    )
}

export default Likes;