import {useEffect, useState} from "react";
import TextInput from "../inputs/TextInput";
import {useAddPostMutation} from "../../redux/api/posts";
import {useGetTagsQuery} from "../../redux/api/api";
import Button from "../inputs/Button";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {notify} from "../../redux/slices/notificationSlice";
function CreatePostForm(){
    const [addPost, {isLoading: sendPost}]= useAddPostMutation();
    const {data, isLoading}= useGetTagsQuery();
    const notLength = useSelector(state=>state.notifications.length)
    const [text, setText]=useState("");
    const [error, setError]=useState("");
    const [tags,setTags]= useState([]);
    const [change, setChange]=useState(false)
    const dispatch = useDispatch()

    const toggleTag = (tag)=>{
       const result=tags;
       if(result.includes(tag)){
           const index = result.indexOf(tag);
           result.splice(index,1);
       }else{
           result.push(tag);
       }

       setTags(result);
       setChange(!change)
    }

    const onSubmit = async()=>{
        if(text.length>=3){
            await addPost({
                text:text,
                tags:tags
            }).then(()=>{
                setText("");
                setTags([]);
                dispatch(notify({
                    id: notLength,
                    type:"success",
                    text:"Post Created!",
                    active:true
                }))
            }).catch(()=>{
                dispatch(notify({
                    id: notLength,
                    type:"fail",
                    text:"Error posting",
                    active:true
                }))
            })
        } else{
            setError("Not enough characters to submit post")
        }

    }

    useEffect(()=>{

    },[change])

    return(
        <div className={"createForm"}>
            {sendPost&&<FontAwesomeIcon className={"load"} icon={faSpinner} spin/>}
            <h1>Create a Post</h1>
            <TextInput type={"text"} vl={text} chg={setText}/>
            <h3>Add Tags</h3>
            <div className={"tags"}>
                {isLoading? <FontAwesomeIcon icon={faSpinner} spin/>: data.map((i)=>
                    <div key={i.id} className={"tag"} onClick={()=>toggleTag(i)} style={{border: tags.includes(i)? "3px solid blue" : "none"}}>{i.name}</div>
                ) }
            </div>
            <Button click={onSubmit} vl={"SUBMIT"} theme={"submit"}/>
            <h1 style={{"color":"red"}}>{error}</h1>
        </div>
    )
}

export default CreatePostForm;