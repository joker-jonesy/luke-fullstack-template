import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {useDeleteCommentMutation} from "../reducers/api";


function Comments({data, edit}) {

    const [deleteComment]=useDeleteCommentMutation();

    const onDelete =  async (id) => {
        await deleteComment(id).then(() => {
            console.log("deleted")
        }).catch(() => {
            console.log("error")
        })
    }


    return (
        <>
            <h2>Comments</h2>
            <div className="comments">
                {data.map((i) =>
                    <div key={i.id} className="comment">
                        <h3>{i.author.username}</h3>
                        <p>{i.text}</p>
                        {edit&&<FontAwesomeIcon className={"delete"} icon={faTrash} onClick={()=>onDelete(i.id)}/>}
                    </div>
                )}
            </div>

        </>
    )
}

export default Comments;