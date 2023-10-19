import {useState} from "react";
import TextInput from "./inputs/TextInput";
import {useAddCommentMutation} from "../reducers/api";
import Button from "./inputs/Button";
import {useSelector} from "react-redux";
function CreateCommentForm(props){
    const {postId} = props;
    const me = useSelector(state=>state.auth.credentials.user);
    const [addComment]=useAddCommentMutation();

    const [text, setText]=useState("");

    const onSubmit = async()=>{
        if(text.length>=3){
            await addComment({
                text:text,
                authorId: Number(me.userId),
                postId: postId
            }).then(()=>{
                console.log("added");
                setText("");
            }).catch(()=>{
                console.log("error")
            })
        }

    }

    return(
        <div className={"createForm"}>
            <h1>Create a Comment</h1>
            <TextInput type={"text"} vl={text} chg={setText}/>
            <Button click={onSubmit} vl={"COMMENT"} theme={"submit"}/>
        </div>
    )
}

export default CreateCommentForm;