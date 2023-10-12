import {useState} from "react";
import TextInput from "./inputs/TextInput";
import {useAddPostMutation, useGetTagsQuery} from "../reducers/api";
import Button from "./inputs/Button";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
function CreatePostForm(props){
    const {me} = props;
    const [addPost]= useAddPostMutation();
    const {data, isLoading}= useGetTagsQuery();

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
            <h1>Create a Post</h1>
            <TextInput type={"text"} vl={text} chg={setText}/>
            <h3>Add Tags</h3>
            <div className={"tags"}>
                {isLoading? <FontAwesomeIcon icon={faSpinner} spin/>: data.map((i)=>
                    <div key={i.id} className={"tag"}>{i.name}</div>
                ) }
            </div>
            <Button click={onSubmit} vl={"SUBMIT"} theme={"submit"}/>
            <h1 style={{"color":"red"}}>{error}</h1>
        </div>
    )
}

export default CreatePostForm;