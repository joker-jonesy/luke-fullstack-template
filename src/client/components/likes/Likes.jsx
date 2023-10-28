import Like from "./Like";

function Likes ({data, postId}){


    return(
        <div className="likes">
            <Like data={data} postId={postId} type={"like"}/>
            <Like data={data} postId={postId} type={"dislike"}/>
        </div>
    )
}

export default Likes;