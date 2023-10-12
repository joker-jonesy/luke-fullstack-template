import {useState} from "react";
import TextInput from "./inputs/TextInput";
import {useAddPostMutation} from "../reducers/api";
import Button from "./inputs/Button";
function CreatePostForm(props){
    const {me} = props;
    const [addPost]= useAddPostMutation();

    const [text, setText]=useState("");
    const [error, setError]=useState("");

    const onSubmit = async()=>{
        if(text.length>=3){
            await addPost({
                text:text,
                authorId: me.userId
            }).then(()=>{
                console.log("added");
                setText("");
            }).catch(()=>{
                console.log("error")
            })
        } else{
            setError("Not enough characters to submit post")
        }

    }

    return(
        <div className={"createForm"}>
            <TextInput type={"text"} vl={text} chg={setText}/>
            <Button click={onSubmit} vl={"SUBMIT"} theme={"primary"}/>
            <h1 style={{"color":"red"}}>{error}</h1>
        </div>
    )
}

export default CreatePostForm;